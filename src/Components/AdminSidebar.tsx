import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Images/NT.png';

const AdminSidebar: React.FC = () => {
    return (
        <div className="z-1000 h-full w-[5%] bg-white outline outline-gray-300 flex flex-col items-center">
            <div className="h-[10%] upper p-4 rounded-xl flex items-center justify-center">
                <NavLink to="/">
                    <img src={Logo} alt="Logo" />
                </NavLink>
            </div>

            <div className="middle h-full w-full flex flex-col items-center">
                <NavLink
                    to="/client"
                    className={({ isActive }) => `flex h-[20%] items-center justify-center w-full p-3 transition duration-300 ease-in-out cursor-pointer ${isActive ? 'bg-orange-400 !text-white' : 'hover:bg-gray-200 hover:text-white'}`}
                >
                    <i className='fa-solid fa-user text-18px] text-blue'></i>
                </NavLink>

                <NavLink
                    to="/product"
                    className={({ isActive }) => `flex h-[20%] items-center justify-center w-full p-3 transition duration-300 ease-in-out cursor-pointer ${isActive ? 'bg-orange-400 !text-white' : 'hover:bg-gray-200 hover:text-white'}`}
                >
                    <i className='fa-solid fa-box-open text-18px] text-blue'></i>
                </NavLink>

                <NavLink
                    to="/cart"
                    className={({ isActive }) => `flex h-[20%] items-center justify-center w-full p-3 transition duration-300 ease-in-out cursor-pointer ${isActive ? 'bg-orange-400 !text-white' : 'hover:bg-gray-200 hover:text-white'}`}
                >
                    <i className='fa-solid fa-cart-shopping text-18px] text-blue'></i>
                </NavLink>
            </div>

            <div className="bottom p-4 gap-5 w-full flex flex-col items-center justify-end">
                <i className="fa-regular fa-circle-question text-18px] text-blue-500 cursor-pointer"></i>
                <i className="fa-solid fa-right-from-bracket text-18px] text-red-500 rotate-180 cursor-pointer"></i>
            </div>
        </div>
    );
};

export default AdminSidebar;