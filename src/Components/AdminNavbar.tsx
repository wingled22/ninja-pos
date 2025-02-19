import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Images/LOGO.png';

const AdminNavbar: React.FC = () => {
    return (
        <div className="h-[10%] p-3 w-full flex items-center justify-between bg-white outline outline-gray-300">
            <div className='flex flex-1 items-center justify-center'>
                <img src={Logo} alt="Logo" />
            </div>
            <NavLink to="/">
                <div className='flex items-center justify-center rounded-lg border border-gray-300 p-3 cursor-pointer' title="Go to Client Dashboard">
                    <i className="fa-solid fa-arrow-up-right-from-square text-[15px] text-black"></i>
                </div>
            </NavLink>
        </div>
    );
}

export default AdminNavbar;