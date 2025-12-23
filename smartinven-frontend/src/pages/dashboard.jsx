import RevenueChart from "../components/RevenueChart";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import StockChart from "../components/StockChart";
import TopSellingProducts from "../components/TopSellingProducts";
import { useState, useEffect } from "react";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalProfit: 0,
    lowStock: 0,
  });

  const [revenueData, setRevenueData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [
          productRes,
          summaryRes,
          lowStockRes,
          revenueChartRes,
          stockChartRes,
          topProductsRes,
        ] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/inventory/products/count/"),
          fetch("http://127.0.0.1:8000/api/sales/summary/"),
          fetch("http://127.0.0.1:8000/api/inventory/products/low_stock/"),
          fetch("http://127.0.0.1:8000/api/sales/revenue_chart/"),
          fetch("http://127.0.0.1:8000/api/inventory/products/stock_chart/"),
          fetch("http://127.0.0.1:8000/api/sales/top_products/"),
        ]);
        const productCount = await productRes.json();
        const summary = await summaryRes.json();
        const lowStock = await lowStockRes.json();
        const revenueChart = await revenueChartRes.json();
        const stockChart = await stockChartRes.json();
        const topProductsData = await topProductsRes.json();

        setStats({
          totalProducts: productCount.count,
          totalRevenue: summary.total_revenue,
          totalProfit: summary.total_profit,
          lowStock: lowStock.count,
        });
        setRevenueData(
          revenueChart.map((item) => ({
            day: item.sales_date,
            rev: item.total,
          }))
        );
        setStockData(
          stockChart.map((item) => ({
            name: item.name,
            value: item.total_stock,
          }))
        );
        setTopProducts(
          topProductsData.map((item) => ({
            name: item.product__name,
            sales: item.total_sold,
          }))
        );
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading Dashboard...
      </div>
    );
  }
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 ml-60">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mb-6">
          Overview of your inventory and sales
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            subtitle="Active items in inventory"
            icon={<Package size={17} />}
          />
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            subtitle="All-time sales revenue"
            icon={<DollarSign size={17} />}
          />
          <StatCard
            title="Total Profit"
            value={stats.totalProfit}
            subtitle="Profit margin"
            icon={<TrendingUp size={17} />}
          />

          <StatCard
            title="Low Stock Items"
            value={stats.lowStock}
            subtitle="Need restocking"
            icon={<AlertCircle size={17} />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <RevenueChart data={revenueData} />
          <StockChart data={stockData} />
        </div>
        <div className="mt-6">
          <TopSellingProducts data={topProducts} />
        </div>
      </main>
    </div>
  );
}
