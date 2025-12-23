import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function AddSale({ isOpen, onClose, onSave }) {
  const [product, setProducts] = useState([]);
  const [form, setForm] = useState({
    sales_date: "",
    product: "",
    customer_name: "",
    quantity: 0,
    unit_price: 0,
  });
  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem("access");
      fetch("http://127.0.0.1:8000/api/inventory/products/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          setProducts(Array.isArray(data) ? data : []);
        })
        .catch(() => setProducts([]));
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("access");
    const payload = {
      sales_date: form.sales_date,
      product: form.product,
      customer_name: form.customer_name,
      quantity: form.quantity,
      unit_price: form.unit_price,
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/sales/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to add sale:", data);
        return;
      } else {
        alert("Sale recorded successfully");
        onClose();
      }
    } catch (err) {
      console.error("Sale record error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] rounded-xl shadow-lg p-6 relative">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-5">Record New Sale</h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Date*</label>
            <input
              type="date"
              name="sales_date"
              value={form.sales_date}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Product*</label>
            <select
              name="product"
              id=""
              value={form.product}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            >
              <option value="">Select Product....</option>
              {product.map((prod) => {
                return (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Customer Name*</label>
            <input
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Quantity*</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Unit Price ($)*</label>
              <input
                type="number"
                name="unit_price"
                value={form.unit_price}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save Sale
          </button>
        </div>
      </div>
    </div>
  );
}
