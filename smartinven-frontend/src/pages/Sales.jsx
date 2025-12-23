import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import AddSale from "../components/AddSales";

export default function Sales() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sales, setSales] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("access"));

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sales/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        console.log("Sales:", data);
        setSales(data);
      })
      .catch((err) => console.error("Sales fetch error:", err));
  }, []);
  const handleSaveSale = (data) => {
    const newSale = {
      ...data,
      total: data.qty * data.price,
    };

    setSales([newSale, ...sales]);
  };

  return (
    <div className="p-8 ml-60">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>
          <p className="text-gray-500 mt-4">
            Track and manage your sales transactions
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          <Plus /> Record Sale
        </button>
      </div>

      <div className="bg-white mt-6 p-4 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b">
              <th className="py-3">Date</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3 text-gray-400">{sale.sales_date}</td>
                <td className="font-semibold">{sale.product_name}</td>
                <td className="text-gray-400">{sale.customer_name}</td>
                <td className="font-medium">{sale.quantity}</td>
                <td>${sale.unit_price}</td>
                <td className="font-bold text-gray-400">
                  ${sale.total_amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSale
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSale}
      />
    </div>
  );
}
