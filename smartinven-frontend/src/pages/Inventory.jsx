import { Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddProductModal from "../components/AddProduct";
import AddCategoryModal from "../components/AddCategory";

export default function Inventory() {
  const [isPModalOpen, setIsPModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("access") || "");

  const loadProducts = () => {
    fetch("http://127.0.0.1:8000/api/inventory/products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        console.log("products:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Product fetch error:", err.response.data));
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/inventory/products/{id}/",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert("Product deleted successfully!");
        loadProducts();
      } else {
        console.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/20 text-green-600";
      case "Low Stock":
        return "bg-yellow-400/20 text-yellow-600";
      case "Out of Stock":
        return "bg-red-500/20 text-gray-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };
  return (
    <div className=" flex-1 p-8 ml-60">
      <div className="flex items-center justify-between mb-6">
        <div className="">
          <h2 className="font-bold text-3xl ">Inventory management</h2>
          <p className="text-sm mt-3">Manage your product inventory</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setIsPModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-2 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Plus />
            Add Product
          </button>
          <AddProductModal
            isOpen={isPModalOpen}
            onClose={() => setIsPModalOpen(false)}
            onSave={loadProducts}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-700 transition"
          >
            Category
          </button>
          <AddCategoryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={(data) => console.log("New Category Data:", data)}
          />
        </div>
      </div>
      {/* search Bar */}
      <div className="bg-white rounded-xl p-4 mb-5 flex items-center gap-2">
        <Search className="text-gray-400" />
        <input
          type="text"
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
      </div>
      {/* table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className=" border-b">
            <tr>
              <th className="p-5 font-medium text-gray-500">Products</th>
              <th className="p-5 font-medium text-gray-500">SKU</th>
              <th className="p-5 font-medium text-gray-500">Category</th>
              <th className="p-5 font-medium text-gray-500">Quantity</th>
              <th className="p-5 font-medium text-gray-500">Price</th>
              <th className="p-5 font-medium text-gray-500">Cost</th>
              <th className="p-5 font-medium text-gray-500">Status</th>
              <th className="p-5 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3  font-medium cursor-pointer hover:underline">
                  {item.name}
                </td>
                <td className="p-5 text-gray-400">{item.sku}</td>
                <td className="p-5 text-gray-400">
                  {item.category_name ?? "-"}
                </td>
                <td className="p-5">{item.quantity}</td>
                <td className="p-5">{item.selling_price}</td>
                <td className="p-5">{item.cost_price}</td>
                <td className="p-1">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 flex items-center gap-7 mt-4">
                  <SquarePen
                    size={17}
                    className="text-gray-600 hover:text-blue-600 cursor-pointer transition"
                  />
                  <Trash2
                    onClick={() => handleDelete(products.id)}
                    size={17}
                    className="text-red-600 hover:text-red-600 cursor-pointer transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No products found....
          </p>
        )}
      </div>
    </div>
  );
}
