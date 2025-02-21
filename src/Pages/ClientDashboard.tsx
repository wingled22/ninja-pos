import React from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import bearbrand from "../assets/Images/berabrand-1.png";
import { useState } from "react";

const AdminDashboard: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isCartVisible, setIsCartVisible] = useState(false);

	return (
		<div className="bg-white flex flex-col flex-1 h-full w-full">
			<AdminNavbar />

			<div className="flex flex-col  justify-center">
				<div className="m-4 flex flex-col items-center w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
					<div className="p-4 flex flex-col w-full h-[87vh]">
						<div className="max-h-[32vh] overflow-y-auto">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
								{[...Array(30)].map((_, index) => (
									<div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center hover:border-green-500 space-x-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
										<div className="flex-1">
											<h3 className="text-[13px] font-semibold text-gray-800" onClick={() => setIsVisible(!isVisible)}>Product Category</h3>
										</div>
									</div>
								))}
							</div>
						</div>
						
						{isVisible && (
							<div className="flex item-center justify-center max-h-[50vh] overflow-x-auto">
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
									{[...Array(30)].map((_, index) => (
										<div key={index} className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
											<div className="flex item-center">
												<div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
													<img
														className="w-16 h-16 object-contain bearbrand"
														src={bearbrand}
														alt="Bear Brand Milk"
													/>
												</div>
												<div className="ml-3 flex flex-col justify-center">
													<div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
													<p className="text-gray-500 text-[12px]">Milk 25g</p>
												</div>
											</div>
											<div className="flex flex-col italic">
												<span className="text-[13px] text-gray-500">
													Price: ₱60.00
												</span>
											</div>
											<div className="flex justify-center">
												<div onClick={() => setIsCartVisible(!isCartVisible)} className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
													Add to cart
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="absolute top-[10%] right-0 w-[calc(29%-100px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5">
					<div className="flex items-center justify-between pb-5 border-b border-gray-300">
						<h2 className="text-sm text-black font-bold">CART</h2>
					</div>

					{isCartVisible && (
						<div className="pt-10 p-3 h-full w-full flex flex-col items-center justify-between">
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

							<div className="mt-5 text-sm text-gray-800 text-center">
								<p className="font-semibold">Total: ₱ 3600.00</p>
								<p className="text-gray-500 italic">Ordered on 02/12/2025</p>
							</div>

							<div className="w-full mt-4 space-y-3 px-6">
								<div className="flex items-center justify-center cursor-pointer w-full py-2 text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 text-sm font-semibold active:scale-[.957] select-none">
									Order
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div >
	);
}

export default AdminDashboard;