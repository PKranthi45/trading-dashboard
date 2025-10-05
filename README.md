# Crypto RSI Dashboard

A full-stack project that calculates and visualizes the **Relative Strength Index (RSI)** for cryptocurrency trades using Kafka, Rust, Python, and React.

## 🧰 Tools & Technologies

- **Docker & Docker Compose** – for containerized setup  
- **Redpanda (Kafka)** – message streaming platform  
- **Python** – data ingestion service  
- **Rust** – backend service to calculate RSI  
- **React** – frontend dashboard for visualization  

## 📁 Project Structure
crypto-rsi-dashboard/
├── docker-compose.yml
├── data_ingestion/ → Python script to publish trade data
├── backend/ → Rust microservice to calculate RSI
└── frontend/ → React dashboard

######## How to Run

1️⃣ Start Services with Docker
```bash
docker-compose up -d

2️⃣ Run Data Ingestion (Python)
bash
Copy code
cd data_ingestion
python ingest_trades.py

3️⃣ Run Backend (Rust)
bash
Copy code
cd backend
cargo run

4️⃣ Run Frontend (React)
bash
Copy code
cd frontend
npm install
npm start
Then open your browser at http://localhost:3000

Notes
Kafka broker runs via Redpanda inside Docker.
Ensure Docker Desktop is running before starting.
If you face any blank screen issue in React, re-run:
Copy code
npm run build && npm start

Copy code

