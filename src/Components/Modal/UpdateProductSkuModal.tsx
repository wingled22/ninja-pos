import { useState } from "react";
import ProductSku from "../../utils/productSku/IProductSku";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { updateProductSku } from "../../utils/productSku/productSkuSlice";

interface UpdateProductSkuModal {
  onClose: () => void;
  ProductSku: ProductSku;
  onUpdateComplete: () => void;
}

const UpdateProductSkuModal: React.FC<{
  onClose: () => void;
  ProductSku: ProductSku;
  onUpdateComplete: () => void; // New prop
}> = ({ onClose, ProductSku: initialProduct, onUpdateComplete }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [ProductSku, setProductSku] = useState<ProductSku>(initialProduct);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductSku((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const UpdateProductskuHandler = async (): Promise<void> => {
    try {
      await dispatch(
        updateProductSku({
          productSkuId: ProductSku.productSKUId,
          // productId: ProductSku.productId,
          name: ProductSku.name,
          codeName: ProductSku.codeName,
          price: ProductSku.price,
          quantity: ProductSku.quantity,
          unit: ProductSku.unit,
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
        <h2 className="text-black text-2xl font-bold mb-6">Edit Product SKU</h2>
        <form className="space-y-4">
          <div>
            <input
              type="hidden"
              name="productId"
              value={ProductSku.productSKUId}
              className="border text-black"
            />
            <label className="block text-sm font-medium text-gray-700">
              SKU Name
            </label>
            <input
              type="text"
              name="name"
              value={ProductSku.name}
              onChange={handleProductChange}
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
              value={ProductSku.codeName}
              onChange={handleProductChange}
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
              value={ProductSku.price}
              onChange={handleProductChange}
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
              value={ProductSku.quantity}
              onChange={handleProductChange}
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
              value={ProductSku.unit}
              onChange={handleProductChange}
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
              onClick={UpdateProductskuHandler}
              className="cursor-pointer ml-3 w-[100px] p-2 text-[14px] rounded-lg bg-blue-600 text-white font-semibold text-center"
            >
              Update Sku
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductSkuModal;

