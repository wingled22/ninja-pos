import React, { useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../utils/store";
import { getProducts } from "../utils/product/productSlice";
import Product from "../utils/product/IProduct";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useSelector(
    (state: { products: { products: Product[]; isSuccess: boolean } }) =>
      state.products
  );
  useEffect(() => {
    dispatch(getProducts());
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
