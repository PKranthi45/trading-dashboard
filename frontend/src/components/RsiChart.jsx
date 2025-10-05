// src/components/RsiChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";

const RsiChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No RSI data available.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">RSI Trend</h2>
      <LineChart width={900} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
        <Tooltip />
        <ReferenceLine y={70} stroke="red" strokeDasharray="4 4" label="Overbought (70)" />
        <ReferenceLine y={30} stroke="green" strokeDasharray="4 4" label="Oversold (30)" />
        <Line type="monotone" dataKey="rsi" stroke="#4f46e5" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default RsiChart;
