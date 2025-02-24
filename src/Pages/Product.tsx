import React, { useState, useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import bearbrand from "../assets/Images/berabrand-1.png";
import Products from "../utils/product/IProduct";
import { useDispatch, useSelector } from "react-redux";
import UpdateProductModal from "../Components/Modal/UpdateProductModal";
import { getProducts } from "../utils/product/productSlice";
import { AppDispatch, RootState } from "../utils/store";

const Product: React.FC = () => {
  const { products } = useSelector(
    (state: RootState) => state.products
  );

  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        await dispatch(getProducts());
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const openModal = (product: Products) => {
    setSelectedProduct(product);
    setUpdateIsModalOpen(true);
  };

  const handleUpdateComplete = async () => {
    setUpdateIsModalOpen(false); // Close modal
    await dispatch(getProducts()); // Refresh product list
  };

  return (
    <div className="bg-white flex flex-col flex-1 h-full w-full">
      <AdminNavbar />
      <div className="m-5 flex flex-col relative w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
        <div className="cursor-pointer relative m-3 w-[20%] p-2 text-[14px] rounded-lg bg-green-600 text-white font-semibold flex flex-col items-center justify-center text-md">
          Add Product
        </div>
        <div className="flex item-center justify-center h-[72vh] overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-[15px] col-span-4 md:col-span-3 m-3">
              {products.map((product) => (
                <div
                  key={product.productId}
                  className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3"
                >
                  <div className="flex justify-between item-center">
                    <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                      <img
                        className="w-16 h-16 object-contain bearbrand"
                        src={bearbrand}
                        alt="Bear Brand Milk"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="font-bold text-[15px] text-gray-800">
                        {product.productName}
                      </div>
                      <p className="text-gray-500 text-[12px]">Milk 25g</p>
                    </div>
                    <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
                  </div>
                  <div className="flex flex-col italic">
                    <span className="text-[13px] text-gray-500">Stock: 5x</span>
                    <span className="text-[13px] text-gray-500">
                      Price: ₱60.00
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <div
                      className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isUpdateModalOpen && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setUpdateIsModalOpen(false)}
          onUpdateComplete={handleUpdateComplete} // Pass callback
        />
      )}
    </div>
  );
};

export default Product;
