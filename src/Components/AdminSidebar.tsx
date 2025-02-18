import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
    return (
        <div className="h-full w-[6%] bg-white border border-gray-400 flex flex-col items-center">
            <div className="upper p-4 rounded-xl flex items-center justify-center">
                <NavLink to="/">
                    <i className="fa-brands fa-shopify text-[50px] text-green-700 transition duration-300 ease-in-out"></i>
                </NavLink>
            </div>

            <div className="middle h-full w-full flex flex-col items-center border border-t-gray-400 border-b-gray-400">
                <NavLink
                    to="/client"
                    className={({ isActive }) => `flex flex-1 items-center justify-center w-full p-3 transition duration-300 ease-in-out cursor-pointer ${isActive ? 'bg-gray-400 text-white' : ''}`}
                >
                    <i className='fa-solid fa-user text-[30px] text-black'></i>
                </NavLink>

                <NavLink
                    to="/product"
                    className={({ isActive }) => `flex flex-1 items-center justify-center w-full p-3 transition duration-300 ease-in-out cursor-pointer ${isActive ? 'bg-gray-400 text-white' : ''}`}
                >
                    <i className='fa-solid fa-box-open text-[30px] text-black'></i>
                </NavLink>

                <NavLink
                    to="/cart"
                    className={({ isActive }) => `flex flex-1 items-center justify-center w-full p-3 transition duration-300 ease-in-out cursor-pointer ${isActive ? 'bg-gray-400 text-white' : ''}`}
                >
                    <i className='fa-solid fa-cart-shopping text-[30px] text-black'></i>
                </NavLink>
            </div>

            <div className="bottom p-4 gap-5 w-full flex flex-col items-center justify-end border">
                <i className="fa-regular fa-circle-question text-[30px] text-black cursor-pointer"></i>
                <i className="fa-solid fa-right-from-bracket text-[30px] text-red-500 rotate-180 cursor-pointer"></i>
            </div>
        </div>
    );
};

export default AdminSidebar;
