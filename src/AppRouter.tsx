// import App from "./App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminSidebar from "./Components/AdminSidebar";
import AdminDashboard from "./Pages/AdminDashboard";
import ClientDashboard from "./Pages/ClientDashboard";
import Client from "./Pages/Client";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
const AppRouter = () => {
  return (
    <>
      <div className="flex h-screen w-screen">
        <AdminSidebar />
        <div className="flex flex-col flex-1 h-full w-full">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/client" element={<Client />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/clientdashboard" element={<ClientDashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRouter;