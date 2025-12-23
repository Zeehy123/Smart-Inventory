import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddProductModal({ isOpen, onClose, onSave }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    // sku: "",
    category: "",
    quantity: 0,
    reorder_level: 0,
    cost_price: 0,
    selling_price: 0,
  });

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem("access");

      fetch("http://127.0.0.1:8000/api/inventory/categories/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          setCategories(Array.isArray(data) ? data : []);
        })
        .catch(() => setCategories([]));
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("access");
    const payload = {
      name: form.name,
      // sku: form.sku,
      category: form.category,
      quantity: form.quantity,
      reorder_level: form.reorder_level,
      cost_price: form.cost_price,
      selling_price: form.selling_price,
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/inventory/products/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Product error:", data);
        alert("Failed to add product. Please try again.");
      } else {
        alert("Product added successfully!");
        onSave();
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Network Error: Unable to add product.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-lg p-6 relative animate-fade-in">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          <X />
        </button>

        {/* title */}
        <h2 className="text-xl font-semibold mb-6">Product Name</h2>

        {/* form */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="test-sm font-medium">Add New Product</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          {/* <div>
            <label className="text-sm font-medium">SKU*</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              placeholder="Enter SkU"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div> */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Category*</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Quantity*</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Reorder Level*</label>
            <input
              type="number"
              name="reorder_level"
              value={form.reorder_level}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Cost ($)*</label>
            <input
              type="number"
              name="cost_price"
              value={form.cost_price}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price ($)*</label>
            <input
              type="number"
              name="selling_price"
              value={form.selling_price}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
        </div>
        {/* button */}

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
