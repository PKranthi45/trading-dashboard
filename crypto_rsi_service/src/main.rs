use std::collections::HashMap;
use std::time::Duration;
use rdkafka::consumer::{Consumer, StreamConsumer};
use rdkafka::producer::{FutureProducer, FutureRecord};
use rdkafka::Message;
use rdkafka::ClientConfig;
use serde::{Deserialize, Serialize};
use tokio::time::sleep;

#[derive(Deserialize, Debug)]
struct Trade {
    token: String,
    price: f64,
    timestamp: String,
}

#[derive(Serialize, Debug)]
struct RsiData {
    token: String,
    rsi: f64,
}

fn calculate_rsi(prices: &[f64], period: usize) -> Option<f64> {
    if prices.len() < period + 1 {
        return None;
    }

    let mut gains = 0.0;
    let mut losses = 0.0;

    for i in 1..=period {
        let diff = prices[i] - prices[i - 1];
        if diff > 0.0 {
            gains += diff;
        } else {
            losses -= diff;
        }
    }

    let avg_gain = gains / period as f64;
    let avg_loss = losses / period as f64;

    if avg_loss == 0.0 {
        return Some(100.0);
    }

    let rs = avg_gain / avg_loss;
    Some(100.0 - (100.0 / (1.0 + rs)))
}

#[tokio::main]
async fn main() {
    env_logger::init();

    let broker = "localhost:9092";
    let trade_topic = "trade-data";
    let rsi_topic = "rsi-data";

    let consumer: StreamConsumer = ClientConfig::new()
        .set("bootstrap.servers", broker)
        .set("group.id", "rsi_service_group")
        .set("auto.offset.reset", "earliest")
        .create()
        .expect("Failed to create consumer");

    consumer
        .subscribe(&[trade_topic])
        .expect("Can't subscribe to specified topic");

    let producer: FutureProducer = ClientConfig::new()
        .set("bootstrap.servers", broker)
        .create()
        .expect("Producer creation error");

    let mut price_history: HashMap<String, Vec<f64>> = HashMap::new();
    let period = 14;

    loop {
        match consumer.recv().await {
            Err(e) => eprintln!("Kafka error: {}", e),
            Ok(m) => {
                if let Some(payload) = m.payload_view::<str>().ok().flatten() {
                    if let Ok(trade) = serde_json::from_str::<Trade>(payload) {
                        let entry = price_history.entry(trade.token.clone()).or_default();
                        entry.push(trade.price);

                        if let Some(rsi) = calculate_rsi(entry, period) {
                            let rsi_data = RsiData {
                                token: trade.token.clone(),
                                rsi,
                            };

                            let payload = serde_json::to_string(&rsi_data).unwrap();
                            producer.send(
                                FutureRecord::to(rsi_topic)
                                    .payload(&payload)
                                    .key(&trade.token),
                                Duration::from_secs(0),
                            ).await.unwrap();

                            println!("Published RSI for {}: {:.2}", trade.token, rsi);
                        }
                    }
                }
            }
        }

        sleep(Duration::from_millis(100)).await;
    }
}
