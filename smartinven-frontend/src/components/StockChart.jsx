import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

// const data = [
//   { name: "In Stock", value: 3 },
//   { name: "Low Stock", value: 1 },
//   { name: "Out of Stock", value: 1 },
// ];

export default function StockChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border w-full h-72">
      <h2 className="text-lg font-semibold mb-3">Stock Status</h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
