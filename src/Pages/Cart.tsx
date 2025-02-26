import React, { useEffect, useState } from "react";
import AdminNavbar from '../Components/AdminNavbar';
import Logo from '../assets/Images/NT.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { getOrders } from "../utils/order/orderSlice";
import { getOrderDetailByOrderId } from "../utils/orderDetail/orderDetailSlice";
import { getSkuById } from "../utils/productSku/productSkuSlice";
import Order from "../utils/order/IOrder";
import OrderDetail from "../utils/orderDetail/IOrderDetail";
import ProductSku from "../utils/productSku/IProductSku";

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders } = useSelector((state: RootState) => state.orders);

    // State to track the selected order
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [orderItems, setOrderItems] = useState<ProductSku[]>([]);

    // Fetch orders when the component mounts
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    // Handle order selection and fetch its details
    const handleOrderClick = async (order: Order) => {
        setSelectedOrder(order);
        console.log("Fetching order details for orderId:", order.orderId);

        try {
            let orderDetails = await dispatch(getOrderDetailByOrderId(order.orderId)).unwrap();
            console.log("Fetched Order Details:", orderDetails);

            // Ensure orderDetails is always an array
            if (!Array.isArray(orderDetails)) {
                orderDetails = [orderDetails];
            }

            if (orderDetails.length === 0) {
                console.warn("No order details found for this order.");
                setOrderItems([]); // Clear previous items
                return;
            }

            // Fetch product details for all order items
            const productDetails = await fetchProductDetails(orderDetails, dispatch);
            setOrderItems(productDetails.filter((item) => item !== null) as ProductSku[]);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    // Fetch Product Details based on productSkuId
    const fetchProductDetails = async (orderDetails: OrderDetail[], dispatch: AppDispatch) => {
        try {
            const productPromises = orderDetails.map(async (detail) => {
                const productData = await dispatch(getSkuById(detail.productSkuId)).unwrap();

                // Ensure we get a valid product object (handle array case)
                const product = Array.isArray(productData) ? productData[0] : productData;

                if (!product) {
                    console.warn(`No product found for SKU ID: ${detail.productSkuId}`);
                    return null;
                }

                return {
                    name: product.name,
                    quantity: detail.orderQuantity,
                    price: product.price,
                    unit: product.unit,
                    productSKUId: detail.productSkuId
                };
            });

            const products = (await Promise.all(productPromises)).filter(Boolean); // Remove null values
            return products;
        } catch (error) {
            console.error("Error fetching product details:", error);
            return [];
        }
    };





    return (
        <div className="bg-white flex flex-col flex-1 h-full w-full relative">
            <AdminNavbar />
            <div className="m-5 flex flex-col items-center relative w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
                <h2 className="text-sm text-black font-bold mt-5 mb-5">LIST OF ORDERS</h2>
                <div className="relative w-[95%] min-h-[71vh] max-h-[71vh] overflow-y-auto outline, outline-1 outline-gray-300">
                    {orders.length === 0 ? (
                        <p className="text-center py-5">No orders found.</p>
                    ) : (
                        orders.map((orders) => (
                            <div key={orders.orderId} className="flex items-center justify-between w-full h-[60px] pl-5 border-b border-gray-300">
                                <div className="flex items-center justify-between cursor-pointer hover:underline">
                                    <img
                                        src={Logo}
                                        alt="Freelancer Avatar"
                                        className="w-[45px] h-[45px] rounded-full object-cover"
                                    />
                                    <div className="ml-5 flex flex-col justify-center">
                                        <h3 className="text-[14px] font-bold text-gray-900">
                                            Order #{orders.orderId}
                                        </h3>
                                        <p className="text-[12px] text-gray-700 italic">
                                            Ordered on {new Date(orders.orderDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div
                                        className="flex items-center justify-center w-[60px] h-[60px] border-l border-gray-300 cursor-pointer hover:bg-blue-100 transition"
                                        title="Delete Order"
                                    >
                                        <i className="bx bx-trash text-[17px] text-red-600 hover:text-red-700 transition"></i>
                                    </div>
                                    <div
                                        className="flex items-center justify-center w-[60px] h-[60px] border-l border-gray-300 cursor-pointer hover:bg-blue-100 transition"
                                        title="Edit Order"
                                    >
                                        <i className="bx bx-edit text-[17px] text-blue-600 hover:text-blue-700 transition"></i>
                                    </div>
                                    <div
                                        className="flex items-center justify-center w-[60px] h-[60px] border-l border-gray-300 cursor-pointer hover:bg-blue-100 transition"
                                        title="View Info"
                                        onClick={() => handleOrderClick(orders)} // Set selected order
                                    >
                                        <i className="bx bx-info-circle text-[17px] text-gray-600 hover:text-gray-700 transition"></i>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="absolute top-[10%] right-0 w-[calc(29%-100px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5">
                <div className="flex items-center justify-between pb-5 border-b border-gray-300">
                    <h2 className="text-sm text-black font-bold">ORDER INFO</h2>
                </div>
                <div className="p-3 h-full w-full flex flex-col items-center justify-between">
                    {selectedOrder ? (
                        <>

                            <div className="text-sm text-gray-700 space-y-2 w-full">
                                {orderItems.length > 0 ? (
                                    orderItems.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{item.name} {item.unit} x{item.quantity}</span>
                                            <span className="font-medium text-right">₱ {(item.price).toFixed(2)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-gray-500">No items found</p>
                                )}
                            </div>

                            <div className="mt-5 text-sm text-gray-800 text-center">
                                <p className="font-semibold">Total: ₱ {orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                                <p className="text-gray-500 italic">
                                    Ordered on {new Date(selectedOrder.orderDate).toLocaleDateString()}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-sm text-gray-500">Select an order to view details</p>
                    )}
                </div>
            </div>


        </div>
    );
}

export default Cart;