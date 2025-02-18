import React from 'react';
import AdminNavbar from '../Components/AdminNavbar';

const Client: React.FC = () => {
    return (
        <div className="bg-white flex flex-col flex-1 h-full w-full">
            <AdminNavbar />

            <div className="flex-1 flex items-center justify-center relative">
                <div className='cursor-pointer select-none absolute top-4 right-4 p-4 rounded-lg bg-gray-400 text-white font-semibold flex flex-col items-center justify-center text-xl'>
                    Add Client
                </div>
            </div>
        </div>
    );
}

export default Client;