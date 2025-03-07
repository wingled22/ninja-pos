import { useState } from "react";
import ProductSku from "../../utils/productSku/IProductSku";
import Product from "../../utils/product/IProduct";

const AddToCartModal: React.FC<{
    onClose: () => any; 
    selectedProduct: Product & Partial<ProductSku>; 
    onConfirm: (quantity: number) => any;
}> = ({ onClose, selectedProduct, onConfirm }) => {
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="z-1000 fixed inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border-1 border-gray-200">
                {/* Close Button */}
                <div
                    onClick={onClose}
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-red-500"
                >
                    <i className="fa-solid fa-times text-lg"></i>
                </div>

                {/* Modal Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Add to Cart</h2>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-center mb-3">{error}</p>
                )}

                {/* Product Details */}
                {!error && (
                    <>
                        <p className="text-gray-600 text-center mb-3">
                            {selectedProduct.productName} - {selectedProduct.unit}
                        </p>

                        {/* Quantity Input */}
                        <input
                            type="number"
                            placeholder="Enter Quantity"
                            className="w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        />

                        {/* Confirm Button */}
                        <div
                            className="w-full mt-4 py-2 text-center cursor-pointer bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition"
                            onClick={() => {
                                if (!selectedProduct.productSKUId) {
                                    setError("Cannot add to cart. Missing SKU.");
                                    return;
                                }
                                onConfirm(quantity);
                                onClose();
                            }}
                        >
                            Confirm
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddToCartModal;
