import { X } from "lucide-react";
import { useState } from "react";

export default function AddCategoryModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("access");
    const payload = {
      name: form.name,
      description: form.description,
    };
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/inventory/categories/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to add category:", data);
        return;
      }
      alert("Category added successfully");
      onClose();
    } catch (err) {
      console.error("Category add error:", err);
    }
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
        <h2 className="text-xl font-semibold mb-6">Add Category</h2>
        <div className="">
          <label className="text-sm font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="electronics..."
            className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring focus:ring-gray-200 outline-none"
          />
          <label className="text-sm font-medium">description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="write here..."
            className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring focus:ring-gray-200 outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-4 py-5 border rounded-lg hover:gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
