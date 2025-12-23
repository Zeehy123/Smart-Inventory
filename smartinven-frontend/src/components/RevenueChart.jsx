import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { day: "Nov 22", rev: 0 },
//   { day: "Nov 23", rev: 3 },
//   { day: "Nov 24", rev: 2 },
//   { day: "Nov 25", rev: 4 },
//   { day: "Nov 26", rev: 1 },
//   { day: "Nov 27", rev: 0 },
//   { day: "Nov 28", rev: 2 },
// ];

export default function RevenueChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border w-full h-72">
      <h2 className="text-lg font-semibold mb-3">Revenue Overview</h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rev"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
