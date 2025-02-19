import React from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import Logo from '../assets/Images/NT.png';

const Cart: React.FC = () => {
    return (
        <div className="bg-white flex flex-col flex-1 h-full w-full relative">
            <AdminNavbar />
            <div className="m-5 flex flex-col items-center relative w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
                <h2 className="text-sm text-black font-bold mt-5 mb-5">LIST OF ORDERS</h2>
                <div className="relative w-[95%] min-h-[71vh] max-h-[71vh] overflow-y-auto outline, outline-1 outline-gray-300">
                    <div className="flex items-center justify-between w-full h-[60px] pl-5 border-b border-gray-300">

                        <div className="flex items-center justify-between cursor-pointer hover:underline">
                            <img
                                src={Logo}
                                alt="Freelancer Avatar"
                                className="w-[45px] h-[45px] rounded-full object-cover"
                            />
                            <div className="ml-5 flex flex-col justify-center">
                                <h3 className="text-[14px] font-bold text-gray-900">
                                    Ricky Monsales
                                </h3>
                                <p className="text-[12px] text-gray-700 italic">Client</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div
                                className="flex items-center justify-center w-[60px] h-[60px] border-l border-gray-300 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition"
                                title="View Info"
                            >
                                <i className="bx bx-info-circle text-[17px] text-gray-700"></i>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full h-[60px] pl-5 border-b border-gray-300">

                        <div className="flex items-center justify-between cursor-pointer hover:underline">
                            <img
                                src={Logo}
                                alt="Freelancer Avatar"
                                className="w-[45px] h-[45px] rounded-full object-cover"
                            />
                            <div className="ml-5 flex flex-col justify-center">
                                <h3 className="text-[14px] font-bold text-gray-900">
                                    Ricky Monsales
                                </h3>
                                <p className="text-[12px] text-gray-700 italic">Client</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div
                                className="flex items-center justify-center w-[60px] h-[60px] border-l border-gray-300 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition"
                                title="View Info"
                            >
                                <i className="bx bx-info-circle text-[17px] text-gray-700"></i>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full h-[60px] pl-5 border-b border-gray-300">

                        <div className="flex items-center justify-between cursor-pointer hover:underline">
                            <img
                                src={Logo}
                                alt="Freelancer Avatar"
                                className="w-[45px] h-[45px] rounded-full object-cover"
                            />
                            <div className="ml-5 flex flex-col justify-center">
                                <h3 className="text-[14px] font-bold text-gray-900">
                                    Ricky Monsales
                                </h3>
                                <p className="text-[12px] text-gray-700 italic">Client</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div
                                className="flex items-center justify-center w-[60px] h-[60px] border-l border-gray-300 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition"
                                title="View Info"
                            >
                                <i className="bx bx-info-circle text-[17px] text-gray-700"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-[10%] right-0 w-[calc(29%-100px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5">
                <div className="flex items-center justify-between pb-5 border-b border-gray-300">
                    <h2 className="text-sm text-black font-bold">ORDER INFO</h2>
                </div>
                <div className="p-3 h-full w-full flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center my-4">
                        <img
                            src={Logo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border border-gray-300 bg-green-200 p-2"
                        />
                        <h3 className="text-center font-semibold text-gray-800 mt-2">
                            Shendelzare Silkwood
                        </h3>
                    </div>

                    <div className="text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                            <span>Bearbrand 33g x5</span>
                            <span className="font-medium text-right ">₱ 250.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shabu 100g x5</span>
                            <span className="font-medium text-right">₱ 1550.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Bearbrand 33g x5</span>
                            <span className="font-medium text-right">₱ 250.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shabu 100g x5</span>
                            <span className="font-medium text-right">₱ 1550.00</span>
                        </div>
                    </div>

                    {/* Total and Date */}
                    <div className="mt-5 text-sm text-gray-800 text-center">
                        <p className="font-semibold">Total: ₱ 3600.00</p>
                        <p className="text-gray-500 italic">Ordered on 02/12/2025</p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Cart;