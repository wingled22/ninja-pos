import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { getProductSku } from "../utils/productSku/productSkuSlice";
import { getProducts } from "../utils/product/productSlice";
import { createOrder } from "../utils/order/orderSlice";
import AdminNavbar from '../Components/AdminNavbar';
import AddToCartModal from "../Components/Modal/AddToCartModal";
import bearbrand from "../assets/Images/berabrand-1.png";
import ProductSku from "../utils/productSku/IProductSku";
import Product from "../utils/product/IProduct";
import OrderModel from "../utils/order/IOrderModel";


const ClientDashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product & ProductSku | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState<(Product & ProductSku & { quantity: number })[]>([]); // Cart State


    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const { productSku } = useSelector((state: RootState) => state.productSku);
    const { isLoading, isSuccess } = useSelector((state: RootState) => state.orders);


    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getProductSku());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            setCart([]); // Clear cart after successful order
        }
    }, [isSuccess]);

    const categories = [...new Set(products.map((product) => product.productCategory))];
    // Filter products based on selected category
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.productCategory === selectedCategory)
        : [];

    const handleAddToCartClick = (product: Product, sku: ProductSku) => {
        setSelectedProduct({
            ...product,
            ...sku,
        });
        setQuantity(1);
        setIsModalOpen(true);
    };

    const handleConfirmAddToCart = (quantity: number) => {
        if (selectedProduct && selectedProduct.productSKUId) {  // ✅ Ensure productSKUId exists
            setCart((prevCart) => {
                const existingProductIndex = prevCart.findIndex(
                    (item) =>
                        item.productSKUId === selectedProduct.productSKUId &&
                        item.productId === selectedProduct.productId &&
                        item.unit === selectedProduct.unit
                );

                if (existingProductIndex !== -1) {
                    return prevCart.map((item, index) =>
                        index === existingProductIndex
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    return [...prevCart, { ...selectedProduct, quantity }];
                }
            });

            setIsModalOpen(false);
            setSelectedProduct(null);
            setQuantity(1);
        } else {
            console.error("❌ Error: Missing productSKUId in selectedProduct", selectedProduct);
        }
    };

    const handleRemoveFromCart = (productSKUId: number) => {
        setCart((prevCart) => {
            return prevCart
                .map((item) =>
                    item.productSKUId === productSKUId
                        ? { ...item, quantity: item.quantity - 1 } // Reduce quantity
                        : item
                )
                .filter((item) => item.quantity > 0); // Remove item if quantity is 0
        });
    };

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;

        const orderDataArray: OrderModel[] = cart.map((item) => ({
            productSKUId: item.productSKUId,
            orderQuantity: item.quantity
        }));

        if (orderDataArray.length === 0) {
            console.error("❌ Error: No valid items to order.");
            return;
        }
        // Show confirmation dialog
        const result = await Swal.fire({
            title: "Finalize Order",
            text: "Do you want to place this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3542f9",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        });

        if (result.isConfirmed) {
            dispatch(createOrder(orderDataArray)).unwrap()
                .then(() => {
                    Swal.fire("Success!", "Order placed successfully.", "success");
                })
                .catch((error) => {
                    Swal.fire("Error", `Failed to place order: ${error}`, "error");
                });

            console.log("📤 Sending orderData to backend:", JSON.stringify(orderDataArray));
        }
    };



    return (
        <div className="bg-white flex flex-col flex-1 h-full w-full">
            <AdminNavbar />
            <div className="flex flex-col  justify-center">

                <div className="m-4 flex flex-col items-center w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
                    <div className="p-4 flex flex-col w-full h-[87vh]">

                        <div className="max-h-[32vh] min-h-[32vh] overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                                {categories.map((category) => (
                                    <div key={category} className={`bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 border border-gray-200 hover:shadow-lg transition-all duration-300 
                                        ${selectedCategory === category ? "border-green-500" : "hover:border-green-500"}`}
                                        onClick={() => setSelectedCategory(category)}>

                                        <div className="flex-1">
                                            <h3 className="text-[13px] font-semibold text-gray-800" onClick={() => setIsVisible(!isVisible)}>{category}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {selectedCategory && (
                            <div className="flex item-center justify-center max-h-[50vh] min-h-[50vh] overflow-x-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                                    {filteredProducts.map((product) => {
                                        const skus = productSku?.filter((sku) => Number(sku.productId) === product.productId) || [];

                                        return skus.length > 0 ? skus.map((sku) => (
                                            <div key={sku.productSKUId || `${product.productId}-${sku.unit}`} className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border border-gray-300 p-3">
                                                <div className="flex items-center">
                                                    <img className="w-16 h-16 object-contain border border-gray-300 rounded-full bg-gray-300" src={bearbrand} alt={product.productName} />
                                                    <div className="ml-3 flex flex-col justify-center">
                                                        <div className="font-bold text-[15px] text-gray-800">{product.productName}</div>
                                                        <p className="text-gray-500 text-[12px]">{sku.unit}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col italic">
                                                    <span className="text-[13px] text-gray-500">Price: ₱{sku.price}</span>
                                                </div>
                                                <div className="flex justify-center">
                                                    <div
                                                        onClick={() => handleAddToCartClick(product, sku)}
                                                        className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                                                        Add to cart
                                                    </div>
                                                </div>
                                            </div>
                                        )) : null;
                                    })}


                                    {isModalOpen && selectedProduct && (
                                        <AddToCartModal
                                            selectedProduct={selectedProduct}
                                            onClose={() => setIsModalOpen(false)}
                                            onConfirm={handleConfirmAddToCart}
                                        />
                                    )}


                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="absolute top-[10%] right-0 w-[calc(29%-100px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5">
                    <div className="flex items-center justify-between pb-5 border-b border-gray-300">
                        <h2 className="text-sm text-black font-bold">CART</h2>
                    </div>

                    <div className="pt-10 p-3 h-full w-full flex flex-col items-center justify-between">
                        <div className="text-sm text-gray-700 space-y-2 w-full">
                            {cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div key={index} className="flex items-center justify-center w-full">
                                        {/* Minus Button */}
                                        <i
                                            className="fas fa-minus p-1 bg-gray-100 text-red-500 text-[12px] cursor-pointer hover:text-red-700 transition-all text-lg"
                                            onClick={() => handleRemoveFromCart(item.productSKUId)}
                                        ></i>


                                        <div className="flex items-center justify-between w-full">
                                            {/* Product Details */}
                                            <span className="ml-1">
                                                {item.productName} {item.unit} x{item.quantity}
                                            </span>

                                            {/* Price */}
                                            <span className="font-medium text-right">
                                                ₱{(item.price * item.quantity).toFixed(2)}
                                            </span>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No items in cart</p>
                            )}
                        </div>

                        <div className="mt-5 text-sm text-gray-800 text-center">
                            <p className="font-semibold">
                                Total: ₱
                                {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                            </p>
                        </div>

                        <div className="w-full mt-4 space-y-3 px-6">
                            <div onClick={handlePlaceOrder}
                                className="flex items-center justify-center cursor-pointer w-full py-2 text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 text-sm font-semibold active:scale-[.957] hover:bg-green-700">
                                Order
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ClientDashboard;