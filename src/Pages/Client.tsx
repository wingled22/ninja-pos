import React, { useState } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import Turtle from '../assets/Images/NT.png';
import AddClientModal from '../Components/Modal/AddClientModal';

const Client: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-white flex flex-col h-screen w-full overflow-hidden">
            <AdminNavbar />

            <div className="flex flex-1 overflow-hidden">
                {/* LEFT */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Search & Add */}
                    <div className="w-full flex items-center justify-between mb-4">
                        <div className="relative w-full max-w-lg">
                            <input
                                type="text"
                                placeholder="Search a client"
                                className="w-full text-black pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition-all duration-300"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                        </div>

                        <div 
                            className="px-6 py-3 ml-4 rounded-xl text-white bg-green-600 font-semibold shadow-md active:scale-95 cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add Client
                        </div>
                    </div>

                    {/* Clients Grid */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {[...Array(30)].map((_, index) => (
                                <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center hover:border-green-500 space-x-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                                    {/* Profile Picture */}
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
                                        <img src={Turtle} alt="Client" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Client Info */}
                                    <div className="flex-1">
                                        <h3 className="text-md font-semibold text-gray-800">Ninja Turtle</h3>
                                        <p className="text-xs text-gray-500">ninjaturtle@example.com</p>
                                        <p className="text-xs text-gray-400">Joined: Feb 19, 2025</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col space-y-2">
                                        <div className="text-orange-300 hover:text-orange-400 transition-all duration-300 cursor-pointer">
                                            <i className="fa-solid fa-user-pen text-xl"></i>
                                        </div>
                                        <div className="text-red-400 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                            <i className="fa-solid fa-trash text-xl"></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="h-full w-[20%] hidden lg:flex flex-col items-center bg-white shadow-xl p-6 relative overflow-hidden">
                    {/* Profile Image */}
                    <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-green-500 shadow-xl transform hover:scale-105 transition-all duration-300">
                        <img src={Turtle} alt="Client Profile" className="w-full h-full object-cover" />
                    </div>

                    {/* Client Name & Email */}
                    <h2 className="mt-5 text-2xl font-bold text-gray-900">Ninja Turtle</h2>
                    <p className="text-gray-500 text-sm font-medium">ninjaturtle@example.com</p>

                    {/* Extra Client Info */}
                    <div className="mt-6 w-full space-y-4 text-left px-6 flex-1">
                        <p className="flex items-center text-gray-700 text-sm">
                            <i className="fa-solid fa-calendar-days text-green-500 mr-2"></i>
                            <span className="font-semibold">Joined:</span> Feb 19, 2025
                        </p>
                        <p className="flex items-center text-gray-700 text-sm">
                            <i className="fa-solid fa-phone text-green-500 mr-2"></i>
                            <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                        </p>
                        <p className="flex items-center text-gray-700 text-sm">
                            <i className="fa-solid fa-map-marker-alt text-green-500 mr-2"></i>
                            <span className="font-semibold">Address:</span> 123 Sewer St, NYC
                        </p>
                        <p className="flex items-center text-gray-700 text-sm">
                            <i className="fa-solid fa-id-badge text-green-500 mr-2"></i>
                            <span className="font-semibold">Membership:</span> Premium
                        </p>
                        <p className="flex items-center text-gray-700 text-sm">
                            <i className="fa-solid fa-car text-green-500 mr-2"></i>
                            <span className="font-semibold">Total Orders:</span> 15
                        </p>
                        <p className="flex items-center text-gray-700 text-sm">
                            <i className="fa-solid fa-star text-green-500 mr-2"></i>
                            <span className="font-semibold">Rating:</span> 4.8/5
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="w-full mt-4 space-y-3 px-6">
                        <div className="flex items-center justify-center cursor-pointer w-full py-2 text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 text-sm font-semibold">
                            Edit Profile
                        </div>
                    </div>

                    {/* Website Link */}
                    <p className='mt-4 text-xs text-gray-400'>www.ninjaturtles.com</p>
                </div>
            </div>

            {isModalOpen && <AddClientModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Client;