import pandas as pd
from kafka import KafkaProducer
import json
import time

# -----------------------------
# Configuration
# -----------------------------
BROKER = '127.0.0.1:19092'     # Redpanda broker
TOPIC = 'trade-data'           # Kafka topic
CSV_FILE = 'trades_data.csv'   # CSV file path
SEND_DELAY = 0.01              # Delay between messages (seconds)
# -----------------------------

def main():
    # 1. Read CSV
    try:
        df = pd.read_csv(CSV_FILE)
        print(f"Loaded {len(df)} trades from {CSV_FILE}")
    except FileNotFoundError:
        print(f"Error: {CSV_FILE} not found!")
        return

    # 2. Initialize Kafka producer
    producer = KafkaProducer(
        bootstrap_servers=BROKER,
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

    # 3. Send each trade as a JSON message
    for idx, row in df.iterrows():
        trade = row.to_dict()
        producer.send(TOPIC, value=trade)
        print(f"Sent trade {idx+1}/{len(df)}")
        time.sleep(SEND_DELAY)  # Optional, avoid overwhelming broker

    # 4. Flush producer to make sure all messages are sent
    producer.flush()
    print("All trades sent successfully!")

if __name__ == "__main__":
    main()
