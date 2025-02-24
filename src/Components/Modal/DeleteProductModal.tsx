import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { deleteProduct } from "../../utils/product/productSlice";
import Product from "../../utils/product/IProduct";

interface DeleteProductModalProps {
  onClose: () => void;
  product: Product;
  onUpdateComplete: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  onClose,
  product,
  onUpdateComplete,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(product.productId)); // Call delete action
      onUpdateComplete(); // Refresh product list
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      onClose(); // Close modal
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Product</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{product.productName}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="w-24 p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-red-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-24 p-2 bg-red-300 text-gray-700 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
