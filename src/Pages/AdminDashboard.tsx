import React, { useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../utils/store";
import { getProducts } from "../utils/product/productSlice";
import { getClients } from "../utils/client/clientSlice";
import Product from "../utils/product/IProduct";
import Client from "../utils/client/IClient";
const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector(
    (state: { products: { products: Product[] } }) => state.products
  );

  const { clients } = useSelector(
    (state: { clients: { clients: Client[] } }) => state.clients
  );

  console.log(products);
  console.log(clients);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getClients());
  }, [dispatch]);
  return (
    <div className="bg-white flex flex-col flex-1 h-full w-full">
      <AdminNavbar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-black text-2xl">DASHBOARD</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
