export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border w-full">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-1">{value}</h2>
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  );
}
