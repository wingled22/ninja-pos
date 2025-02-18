import React from 'react';
import Logo from '../assets/Images/LOGO.png';

const AdminNavbar: React.FC = () => {
    return (
        <div className="h-[10%] p-3 w-full flex items-center justify-end bg-white outline outline-gray-300">
            <div className='flex flex-1 items-center justify-center'>
                <img src={Logo} alt="Logo" />
            </div>
            <div className='flex items-center justify-center rounded-lg border border-gray-300 p-4 cursor-pointer'>
                <i className="fa-solid fa-arrow-up-right-from-square text-[20px] text-black"></i>
            </div>
        </div>
    );
}

export default AdminNavbar;