import React from 'react';
import AdminNavbar from '../Components/AdminNavbar';

const AdminDashboard: React.FC = () => {
    return (
        <div className="bg-white flex flex-col flex-1 h-full w-full">
            <AdminNavbar />
            <div className="flex-1 flex items-center justify-center">
                <h1 className='text-black text-2xl'>DASHBOARD</h1>
            </div>
        </div>
    );
}

export default AdminDashboard;