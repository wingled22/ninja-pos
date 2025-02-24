import { useState } from "react";
import Product from "../../utils/product/IProduct";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { updateProducts } from "../../utils/product/productSlice";

const UpdateProductModal: React.FC<{
  onClose: () => void;
  product: Product;
  onUpdateComplete: () => void; // New prop
}> = ({ onClose, product: initialProduct, onUpdateComplete }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product>(initialProduct);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const UpdateProductHandler = async (): Promise<void> => {
    try {
      await dispatch(
        updateProducts({
          productId: product.productId,
          productName: product.productName,
          productCategory: product.productCategory,
        })
      );
      onUpdateComplete(); // Call the callback
      onClose(); // Close the modal
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-95 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg outline outline-gray-400">
        <h2 className="text-black text-2xl font-bold mb-6">Update Product</h2>
        <form className="space-y-4">
          <input type="hidden" name="productId" value={product.productId} />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={product.productName}
              onChange={handleProductChange}
              required
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Category
            </label>
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              value={product.productCategory}
              onChange={handleProductChange}
              required
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
              placeholder="Enter product category"
            />
          </div>
          <div className="flex justify-start">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer w-[100px] p-2 text-[14px] rounded-lg bg-red-600 text-white font-semibold"
            >
              Close
            </button>
            <button
              type="button"
              onClick={UpdateProductHandler}
              className="ml-3 cursor-pointer w-[100px] p-2 text-[14px] rounded-lg bg-blue-600 text-white font-semibold"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;

