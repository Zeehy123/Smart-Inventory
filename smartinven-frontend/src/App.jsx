import { Route, Routes } from "react-router-dom";

import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Layout from "./layout/LayOut";
import ProtectedRoute from "./components/ProtectedRoute";
import LogOut from "./pages/logOut";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<LogOut />} />

      {/* Protected layout wrapper */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sales" element={<Sales />} />
        <Route path="inventory" element={<Inventory />} />
      </Route>
    </Routes>
  );
}

export default App;
