import React, { useEffect, useState } from "react";
import AdminNavbar from '../Components/AdminNavbar';
import Logo from '../assets/Images/NT.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { getOrders } from "../utils/order/orderSlice";
import Order from "../utils/order/IOrder"; // Ensure you import your Order interface

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, isLoading, isError } = useSelector((state: RootState) => state.orders);

    // State to track the selected order
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Fetch orders when the component mounts
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <div className="bg-white flex flex-col flex-1 h-full w-full relative">
            <AdminNavbar />
            <div className="m-5 flex flex-col items-center relative w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
                <h2 className="text-sm text-black font-bold mt-5 mb-5">LIST OF ORDERS</h2>
                <div className="relative w-[95%] min-h-[71vh] max-h-[71vh] overflow-y-auto outline, outline-1 outline-gray-300">
                    {isLoading ? (
                        <p className="text-center py-5">Loading orders...</p>
                    ) : isError ? (
                        <p className="text-center text-red-500 py-5">{isError}</p>
                    ) : orders.length === 0 ? (
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
                                        onClick={() => setSelectedOrder(orders)} // Set selected order
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
                            <div className="flex flex-col items-center my-4">
                                <img
                                    src={Logo}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border border-gray-300 bg-green-200 p-2"
                                />
                            </div>

                            <div className="text-sm text-gray-700 space-y-2 w-full">
                                {/* {selectedOrder.items.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span className="font-medium text-right ">₱ {item.price}</span>
                                    </div>
                                ))} */}
                            </div>

                            {/* Total and Date */}
                            <div className="mt-5 text-sm text-gray-800 text-center">
                                {/* <p className="font-semibold">Total: ₱ {selectedOrder.totalPrice}</p> */}
                                <p className="text-gray-500 italic">
                                    Ordered on {new Date(selectedOrder.orderDate).toLocaleDateString()}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Select an order to view details</p>
                    )}
                </div>
            </div>


        </div>
    );
}

export default Cart;