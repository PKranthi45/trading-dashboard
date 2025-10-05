// src/components/TokenSelector.jsx
import { useState } from "react";

const TokenSelector = ({ tokens, selectedToken, onSelect }) => {
  const [value, setValue] = useState(selectedToken || "");

  const handleChange = (e) => {
    const token = e.target.value;
    setValue(token);
    onSelect(token);
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-gray-700 font-semibold mb-1">Select Token:</label>
      <select
        value={value}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded-md bg-white focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">-- Select a token --</option>
        {tokens.map((token) => (
          <option key={token} value={token}>
            {token.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TokenSelector;
