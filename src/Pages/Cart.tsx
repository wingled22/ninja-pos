import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminNavbar from '../Components/AdminNavbar';
import Logo from '../assets/Images/NT.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { getOrders } from "../utils/order/orderSlice";
import { getOrderDetailByOrderId } from "../utils/orderDetail/orderDetailSlice";
import { getSkuById } from "../utils/productSku/productSkuSlice";
import { updateOrder } from "../utils/order/orderSlice";
import { deleteOrder } from "../utils/order/orderSlice";
import Order from "../utils/order/IOrder";
import OrderDetail from "../utils/orderDetail/IOrderDetail";
import OrderUpdateModel from "../utils/order/IOrderUpdateModel";
import ProductSku from "../utils/productSku/IProductSku";

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders } = useSelector((state: RootState) => state.orders);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [orderItems, setOrderItems] = useState<(ProductSku & OrderDetail)[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedOrderItems, setUpdatedOrderItems] = useState<{ orderdetailsID: number; newquantity: number }[]>([]);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const handleOrderClick = async (order: Order) => {
        setSelectedOrder(order);

        try {
            let orderDetails = await dispatch(getOrderDetailByOrderId(order.orderId)).unwrap();

            if (!Array.isArray(orderDetails)) {
                orderDetails = [orderDetails];
            }

            if (orderDetails.length === 0) {
                setOrderItems([]);
                return;
            }

            // Fetch product details and ensure they include orderDetailsId
            const productDetails = await fetchProductDetails(orderDetails, dispatch);

            setOrderItems(
                productDetails
                    .filter((item) => item !== null)
                    .map((item, index) => ({
                        ...item,
                        orderDetailsId: orderDetails[index]?.orderDetailsId,
                        orderQuantity: orderDetails[index]?.orderQuantity,
                        orderTotalPrice: orderDetails[index]?.orderTotalPrice,
                    })) as (ProductSku & OrderDetail)[]
            );
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const fetchProductDetails = async (orderDetails: OrderDetail[], dispatch: AppDispatch) => {
        try {
            const productPromises = orderDetails.map(async (detail) => {
                const productData = await dispatch(getSkuById(detail.productSkuId)).unwrap();

                const product = Array.isArray(productData) ? productData[0] : productData;

                if (!product) {
                    console.warn(`No product found for SKU ID: ${detail.productSkuId}`);
                    return null;
                }

                return {
                    orderDetailsId: detail.orderDetailsId,
                    orderQuantity: detail.orderQuantity,
                    orderTotalPrice: detail.orderTotalPrice,
                    name: product.name,
                    quantity: detail.orderQuantity,
                    price: product.price,
                    unit: product.unit,
                    productSKUId: detail.productSkuId,
                };
            });

            const products = (await Promise.all(productPromises)).filter(Boolean);
            return products;
        } catch (error) {
            console.error("Error fetching product details:", error);
            return [];
        }
    };

    const handleQuantityChange = (orderDetailsId: number, change: number) => {

        setOrderItems((prevItems) =>
            prevItems.map((item) => {
                if (item.orderDetailsId === orderDetailsId) {
                    const newQuantity = Math.max(1, item.orderQuantity + change);

                    // Update or add the correct order detail update
                    setUpdatedOrderItems((prevUpdates) => {
                        const existingUpdateIndex = prevUpdates.findIndex(
                            (upd) => upd.orderdetailsID === orderDetailsId
                        );

                        if (existingUpdateIndex !== -1) {
                            // Update existing quantity
                            const newUpdates = [...prevUpdates];
                            newUpdates[existingUpdateIndex].newquantity = newQuantity;
                            return newUpdates;
                        } else {
                            // Add new update
                            const newUpdate = { orderdetailsID: orderDetailsId, newquantity: newQuantity };
                            return [...prevUpdates, newUpdate];
                        }
                    });

                    return { ...item, orderQuantity: newQuantity };
                }
                return item;
            })
        );
    };

    const handleSaveCartUpdates = async () => {
        if (!selectedOrder) return;

        if (updatedOrderItems.length === 0) {
            Swal.fire("Info", "No changes made to the order.", "info");
            return;
        }

        const updatedOrderDetails: OrderUpdateModel[] = updatedOrderItems.map((upd) => ({
            orderDetailsId: upd.orderdetailsID,
            newOrderQuantity: upd.newquantity,
        }));

        console.log("Sending updatedOrderDetails to backend:", updatedOrderDetails);

        try {
            await dispatch(updateOrder(updatedOrderDetails)).unwrap();

            Swal.fire("Success", "Order updated successfully!", "success");

            // Refresh the order details
            handleOrderClick(selectedOrder);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update order:", error);
            Swal.fire("Error", error instanceof Error ? error.message : "Failed to update order.", "error");
        }
    };

    const handleDeleteOrder = async (orderId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This order will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    dispatch (deleteOrder(orderId));
                    dispatch(getOrders()); // Refresh order list
                    Swal.fire("Deleted!", "The order has been deleted.", "success");
                } catch (error) {
                    console.error("Failed to delete order:", error);
                    Swal.fire("Error", "Failed to delete the order.", "error");
                }
            }
        });
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
                                        onClick={() => handleDeleteOrder(orders.orderId)}
                                    >
                                        <i className="bx bx-trash text-[17px] text-red-600 hover:text-red-700 transition"></i>
                                    </div>
                                    <div
                                        className="flex items-center justify-center w-[60px] h-[60px] border-l border-gray-300 cursor-pointer hover:bg-blue-100 transition"
                                        title="View Info"
                                        onClick={() => handleOrderClick(orders)}
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
                            <div className="mt-5 text-sm text-gray-700 space-y-2 w-full">
                                {orderItems.length > 0 ? (
                                    orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center w-full">
                                            {isEditing && (
                                                <div className="flex">
                                                    <i
                                                        className="fas fa-minus p-1 mr-1 bg-gray-100 text-red-500 text-[12px] cursor-pointer hover:text-red-700 transition-all text-lg"
                                                        onClick={() => handleQuantityChange(item.orderDetailsId, -1)}
                                                    ></i>
                                                    <i
                                                        className="fas fa-plus p-1 mr-2 bg-gray-100 text-green-500 text-[12px] cursor-pointer hover:text-green-700 transition-all text-lg"
                                                        onClick={() => handleQuantityChange(item.orderDetailsId, 1)}
                                                    ></i>
                                                </div>
                                            )}
                                            <div key={index} className="flex justify-between items-center w-full">
                                                <span>{item.name} {item.unit}&nbsp;x{item.orderQuantity}</span>
                                                <span className="font-medium text-right">₱&nbsp;{(item.price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-gray-500">No items found</p>
                                )}
                            </div>

                            <div className="mt-5 text-sm text-gray-800 text-center w-full">
                                <p className="font-semibold">Total: ₱ {orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                                <p className="text-gray-500 italic">
                                    Ordered on {new Date(selectedOrder.orderDate).toLocaleDateString()}
                                </p>
                                <div
                                    onClick={() => {
                                        if (isEditing) {
                                            handleSaveCartUpdates();
                                        }
                                        setIsEditing(!isEditing);
                                    }}
                                    className="mt-5 flex items-center justify-center cursor-pointer w-full py-2 text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 text-sm font-semibold active:scale-[.957] hover:bg-blue-700"
                                >
                                    {isEditing ? "Save Order" : "Edit Order"}
                                </div>
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