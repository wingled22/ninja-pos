import React, { useState, useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import bearbrand from "../assets/Images/berabrand-1.png";
import Products from "../utils/product/IProduct";
import ProductSkus from "../utils/productSku/IProductSku";
import { useDispatch, useSelector } from "react-redux";
import DeleteProductModal from "../Components/Modal/DeleteProductModal";
import { getProducts } from "../utils/product/productSlice";
import { getProductSku } from "../utils/productSku/productSkuSlice";
import { AppDispatch, RootState } from "../utils/store";
import AddProductModal from "../Components/Modal/AddProductModal";
import UpdateProductModal from "../Components/Modal/UpdateProductModal";
import DeactivateProductModal from "../Components/Modal/DeactivateProductModal";
import CreateProductSkuModal from "../Components/Modal/CreateProductSkuModal";
import UpdateProductSkuModal from "../Components/Modal/UpdateProductSkuModal";

const Product: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const { productSku } = useSelector((state: RootState) => state.productSku);
  const [isDeactivateModalOpen, setDeactivateIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [isAddProductSKUModalOpen, setAddProductSKUIsModalOpen] =
    useState(false);
  const [isEditProductSKUModalOpen, setEditProductSKUIsModalOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const [selectedProductSku, setSelectedProductSku] =
    useState<ProductSkus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProductsAndSKUs = async () => {
      setIsLoading(true);
      try {
        await dispatch(getProducts());
        await dispatch(getProductSku()); // Fetch SKU data
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsAndSKUs();
  }, [dispatch]);

  const handleAddComplete = async () => {
    setAddIsModalOpen(false); // Close modal
    await dispatch(getProducts()); // Refresh product list
  };

  const handleAddProductSKUComplete = async () => {
    setAddProductSKUIsModalOpen(false); // Close modal
    await dispatch(getProductSku()); // Refresh product list
  };

  const handleEditProductSKUComplete = async () => {
    setEditProductSKUIsModalOpen(false); // Close modal
    await dispatch(getProductSku()); // Refresh product list
  };

  const handleDeleteComplete = async () => {
    setDeleteIsModalOpen(false); // Close modal
    await dispatch(getProducts()); // Refresh product list
  };

  const handleUpdateComplete = async () => {
    setUpdateIsModalOpen(false); // Close modal
    await dispatch(getProducts()); // Refresh product list
  };

  const handleDeactivateComplete = async () => {
    setDeactivateIsModalOpen(false); // Close modal
    await dispatch(getProducts()); // Refresh product list
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const openModal = (product: Products) => {
    setSelectedProduct(product);
    setAddIsModalOpen(true);
  };

  const openAddProductSKUModal = (product: Products) => {
    setSelectedProduct(product);
    setAddProductSKUIsModalOpen(true);
    console.log(product);
  };

  const openEditProductSKUModal = (productSku: ProductSkus) => {
    setSelectedProductSku(productSku);
    setEditProductSKUIsModalOpen(true);
    // console.log(productSku);
  };

  const openDeactivateModal = (product: Products) => {
    setSelectedProduct(product);
    setDeactivateIsModalOpen(true);
  };

  const openDeleteModal = (product: Products) => {
    setSelectedProduct(product);
    setDeleteIsModalOpen(true);
  };

  const openUpdateModal = (product: Products) => {
    setSelectedProduct(product);
    setUpdateIsModalOpen(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("Selected option:", selectedOption);
  };

  return (
    <div className="bg-white flex flex-col flex-1 h-full w-full">
      <AdminNavbar />
      <div className="m-5 flex flex-col relative w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
        <div
          className="cursor-pointer relative m-3 w-[20%] p-2 text-[14px] rounded-lg bg-green-600 text-white font-semibold flex flex-col items-center justify-center text-md"
          onClick={() => setAddIsModalOpen(true)}
        >
          Add Product
        </div>
        <div className="flex item-center justify-center h-[72vh] overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-[15px] col-span-4 md:col-span-3 m-3">
              {products.map((product) => {
                const sku = productSku.find(
                  (sku) => String(sku.productId) === String(product.productId)
                );

                return (
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
                        <p className="text-gray-500 text-[12px]">
                        {sku?.name || "Name Unknown"}
                        {sku?.unit || "Unit Unknown"}
                        </p>
                      </div>
                      <div>
                        <i
                          className="fa-solid fa-pen-to-square text-[14px] text-blue-500 cursor-pointer"
                          onClick={() => openUpdateModal(product)}
                        ></i>
                        <i
                          className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"
                          onClick={() => openDeleteModal(product)}
                        ></i>
                      </div>
                    </div>
                    <div className="flex flex-col italic">
                      <div className="flex justify-between">
                        <span className="text-[13px] text-gray-500">
                          Stock: {sku?.quantity || "0"}x
                        </span>
                        <span
                          className={`text-[13px] text-white rounded-lg w-[40%] text-center ${
                            product.productStatus === "Activated"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {product.productStatus}
                        </span>
                      </div>
                      <span className="text-[13px] text-gray-500">
                        Price: ₱{sku?.price?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      {product.productStatus === "Deactivated" ? (
                        <>
                          {sku ? (
                            <div
                              className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[80%] cursor-pointer hover:bg-blue-600 hover:border-gray-700"
                              onClick={() => openEditProductSKUModal(sku)} // Edit SKU modal
                            >
                              Edit SKU
                            </div>
                          ) : (
                            <div
                              className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[80%] cursor-pointer hover:bg-blue-600 hover:border-gray-700"
                              onClick={() => openAddProductSKUModal(product)} // Add SKU modal
                            >
                              Add SKU
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {sku ? (
                            <div
                              className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[80%] cursor-pointer hover:bg-blue-600 hover:border-gray-700"
                              onClick={() => openEditProductSKUModal(sku)} // Edit SKU modal
                            >
                              Edit SKU
                            </div>
                          ) : (
                            <div
                              className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[80%] cursor-pointer hover:bg-blue-600 hover:border-gray-700"
                              onClick={() => openAddProductSKUModal(product)} // Add SKU modal
                            >
                              Add SKU
                            </div>
                          )}
                          <div
                            className="text-[14px] border-1 border-white font-semibold text-center text-white bg-red-500 rounded-lg p-2 w-[80%] cursor-pointer hover:bg-red-600 hover:border-gray-700"
                            onClick={() => openDeactivateModal(product)}
                          >
                            Deactivate
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-[10%] right-0 w-[calc(29%-120px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5">
        <p className="font-bold text-[15px] text-black"> FILTER </p>
        <form onSubmit={handleSubmit} className="w-[50%]">
          <div className="w-64 relative mt-30">
            <label className="block text-md text-gray-700 mb-1 font-bold">
              Select a Product
            </label>
            <select
              id="options"
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[200px]"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className="w-64 relative mt-10">
            <label className="block text-md font-bold text-gray-700 mb-1">
              Select a Category
            </label>
            <select
              id="options"
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[200px]"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </form>
      </div>
      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setAddIsModalOpen(false)}
          onAddComplete={handleAddComplete}
        />
      )}
      {isDeleteModalOpen && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => setDeleteIsModalOpen(false)}
          onUpdateComplete={handleDeleteComplete} // Pass callback
        />
      )}
      {isUpdateModalOpen && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setUpdateIsModalOpen(false)}
          onUpdateComplete={handleUpdateComplete} // Pass callback
        />
      )}
      {isDeactivateModalOpen && selectedProduct && (
        <DeactivateProductModal
          product={selectedProduct}
          onClose={() => setDeactivateIsModalOpen(false)}
          onUpdateComplete={handleDeactivateComplete} // Pass callback
        />
      )}
      {isAddProductSKUModalOpen && selectedProduct && (
        <CreateProductSkuModal
          product={selectedProduct}
          onClose={() => setAddProductSKUIsModalOpen(false)}
          onUpdateComplete={handleAddProductSKUComplete} // Pass callback
        />
      )}
      {isEditProductSKUModalOpen && selectedProductSku && (
        <UpdateProductSkuModal
          ProductSku={selectedProductSku}
          onClose={() => setEditProductSKUIsModalOpen(false)}
          onUpdateComplete={handleEditProductSKUComplete} // Pass callback
        />
      )}
    </div>
  );
};

export default Product;
