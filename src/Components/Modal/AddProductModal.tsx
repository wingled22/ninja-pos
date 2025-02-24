import { useState } from "react";
import Product from "../../utils/product/IProduct";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { addProducts } from "../../utils/product/productSlice";
import ProductModel from "../../utils/product/IProductModel";

interface AddProductModal {
  onClose: () => void;
  onAddComplete: () => void;
}

const AddProductModal: React.FC<AddProductModal> = ({
  onClose,
  onAddComplete,
}) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<ProductModel>({
    productName: "",
    productCategory: "",
  });

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  };

  const addProductHandler = async (): Promise<void> => {
    try {
      await dispatch(addProducts(product));
      onAddComplete();
    } catch (e) {
      console.log("An error occured", e);
    } finally {
      onClose(); // Close modal
    }
  };

  console.log(product);
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
        <h2 className="text-black text-2xl font-bold mb-6">Add Product</h2>
        <form action="your_action_url_here" method="POST" className="space-y-4">
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
              placeholder="Enter product name"
            />
          </div>

          <div className="flex justify-start">
            <div
              onClick={onClose}
              className="cursor-pointer w-[100px] p-2 text-[14px] rounded-lg bg-red-600 text-white font-semibold flex flex-col items-center justify-center text-md"
            >
              Close
            </div>
            <div
              className="cursor-pointer ml-3 w-[100px] p-2 text-[14px] rounded-lg bg-blue-600 text-white font-semibold flex flex-col items-center justify-center text-md"
              onClick={addProductHandler}
            >
              Add product
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
