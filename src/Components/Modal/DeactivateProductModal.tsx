import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { deactivateProduct } from "../../utils/product/productSlice";
import Product from "../../utils/product/IProduct";

interface DeactivateProductModalProps {
  onClose: () => void;
  product: Product;
  onUpdateComplete: () => void;
}

const DeactivateProductModal: React.FC<DeactivateProductModalProps> = ({
  onClose,
  product,
  onUpdateComplete,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeactivate = async () => {
    try {
      await dispatch(deactivateProduct(product.productId));
      onUpdateComplete(); // Refresh product list
    } catch (error) {
      console.error("Failed to deactivate product:", error);
    } finally {
      onClose(); // Close modal
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Deactivate Product
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to deactivate <strong>{product.productName}</strong>
          ?
        </p>
        <div className="flex justify-end space-x-4">
          <div
            onClick={onClose}
            className="cursor-pointer w-[100px] p-2 text-[14px] rounded-lg bg-red-600 text-white font-semibold flex flex-col items-center justify-center text-md"
          >
            Cancel
          </div>
            <div
              onClick={handleDeactivate}
              className="cursor-pointer ml-3 w-[100px] p-2 text-[14px] rounded-lg bg-blue-600 text-white font-semibold flex flex-col items-center justify-center text-md"
            >
              Deactivate
            </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateProductModal;
