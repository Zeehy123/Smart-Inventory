import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// const data = [
//   { name: "Wireless Mouse", sales: 15 },
//   { name: "Webcam HD", sales: 4 },
//   { name: "Laptop Stand", sales: 3 },
//   { name: "Mechanical Keyboard", sales: 2 },
//   { name: "USB-C Cable", sales: 0 },
// ];

export default function TopSellingProducts({ data }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border w-full mt-6">
      <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#22c55e" /> {/* Green bars */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
