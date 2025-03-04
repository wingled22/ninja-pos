import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { createProductSKU } from "../../utils/productSku/productSkuSlice";
import ProductSkuModel from "../../utils/productSku/IProductSkuModel";
import Product from "../../utils/product/IProduct";

const CreateProductSkuModal: React.FC<{
  onClose: () => void;
  product: Product;
  onUpdateComplete: () => void;
}> = ({ onClose, product: initialProduct, onUpdateComplete }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Initialize productSku with productId from initialProduct
  const [productSku, setProductSku] = useState<ProductSkuModel>({
    productId: initialProduct.productId,
    name: "",
    codeName: "",
    price: 0,
    quantity: 0,
    unit: "",
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductSku((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const creatProductSkuHandler = async (): Promise<void> => {
    try {
      await dispatch(createProductSKU(productSku));
      onUpdateComplete(); // Notify parent component
    } catch (e) {
      console.error("An error occurred", e);
    } finally {
      onClose(); // Close the modal
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

  useEffect(() => {
    if (productSku.name) {
      const words = productSku.name.trim().split(/\s+/); // Split the input by spaces

      // Extract the first letters of words that are not numeric or end with "g"
      const letters = words
        .filter((word) => !/^\d+g$/i.test(word) && isNaN(Number(word))) // Exclude numeric-like words and "10g"
        .map((word) => word.charAt(0).toUpperCase()) // Get the first letter of each remaining word
        .join(""); // Join letters

      // Extract only the numeric portion from the entire name
      const numbers = productSku.name.match(/\d+/)?.[0] || ""; // Match numeric sequence or empty string

      // Combine the letters and numbers
      const generatedCodeName = `${letters}${numbers}`;
      setProductSku((prev) => ({ ...prev, codeName: generatedCodeName }));
    }
  }, [productSku.name]);

  return (
    <div className="fixed inset-0 bg-opacity-95 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg outline outline-gray-400">
        <h2 className="text-black text-2xl font-bold mb-6">Add Product SKU</h2>
        <form className="space-y-4">
          <div>
            <input
              type="hidden"
              name="productId"
              value={productSku.productId}
              className="border text-black"
            />
            <label className="block text-sm font-medium text-gray-700">
              SKU Name
            </label>
            <input
              type="text"
              name="name"
              value={productSku.name}
              onChange={handleInputChange}
              required
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
              placeholder="Enter SKU name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Code Name
            </label>
            <input
              type="text"
              name="codeName"
              value={productSku.codeName}
              onChange={handleInputChange}
              required
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
              placeholder="Enter code name"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productSku.price}
              onChange={handleInputChange}
              required
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={productSku.quantity}
              onChange={handleInputChange}
              required
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              value={productSku.unit}
              onChange={handleInputChange}
              required
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
              placeholder="Enter unit (e.g., pcs, kg)"
            />
          </div>

          <div className="flex justify-start mt-4">
            <div
              onClick={onClose}
              className="cursor-pointer w-[100px] p-2 text-[14px] rounded-lg bg-red-600 text-white font-semibold text-center"
            >
              Close
            </div>
            <div
              onClick={creatProductSkuHandler}
              className="cursor-pointer ml-3 w-[100px] p-2 text-[14px] rounded-lg bg-blue-600 text-white font-semibold text-center"
            >
              Add SKU
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductSkuModal;
