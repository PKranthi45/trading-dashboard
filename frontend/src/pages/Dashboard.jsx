import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Dashboard = () => {
  const [rsiData, setRsiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/rsi"); // your Rust backend endpoint
      setRsiData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Crypto RSI Dashboard</h1>

      <LineChart width={900} height={400} data={rsiData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="rsi" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
