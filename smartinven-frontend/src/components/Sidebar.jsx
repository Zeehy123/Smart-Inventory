import { Home, Boxes, ShoppingCart, LogOut } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menuItem = (path) =>
    pathname === path
      ? "px-6 py-3 bg-blue-50 text-blue-600 rounded-full flex items-center space-x-3 cursor-pointer"
      : "px-6 py-3 hover:bg-gray-100 rounded-full flex items-center space-x-3 cursor-pointer";
  return (
    <aside className="w-60 h-screen fixed top-0 left-0 bg-white shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold p-6 border-b">SmartInventory</h1>

        <nav className="mt-4 px-5">
          <ul className="space-y-2 text-gray-600">
            <Link to="/dashboard">
              <li className={menuItem("/dashboard")}>
                <Home size={18} />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/inventory">
              <li className={menuItem("/inventory")}>
                <Boxes size={18} />
                <span>Inventory</span>
              </li>
            </Link>
            <Link to="/sales">
              <li className={menuItem("/sales")}>
                <ShoppingCart size={18} />
                <span>Sales</span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t">
        <button className="flex items-center space-x-3 text-gray-600 hover:text-red-500">
          <LogOut size={18} />
          <Link to="/logout">LogOut</Link>
        </button>
      </div>
    </aside>
  );
}
