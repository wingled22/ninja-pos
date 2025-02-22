import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { getClients, deleteClient } from "../utils/client/clientSlice";
import AdminNavbar from "../Components/AdminNavbar";
import Turtle from "../assets/Images/NT.png";
import AddClientModal from "../Components/Modal/AddClientModal";
import { ToastContainer, toast } from 'react-toastify';
import DeleteClientModal from "../Components/Modal/DeleteClientModal";
import NCF from "../assets/Images/NoClientsFound.png";

const Client: React.FC = () => {
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const { clients, isLoading, isError, message } = useSelector(
        (state: RootState) => state.clients
    );

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    const notify = () => toast.success("Wow so easy!");


    // Function to handle delete click
    const handleDeleteClick = (clientId: number) => {
        setSelectedClientId(clientId);
        setIsDeleteClientModalOpen(true);
    };

    // Function to confirm deletion
    const handleConfirmDelete = async () => {
        if (selectedClientId !== null) {
            await dispatch(deleteClient(selectedClientId));
            dispatch(getClients);
            dispatch(getClients());
            setIsDeleteClientModalOpen(false);
        }
    };

    // get the selected client's details upon deletion
    const selectedClient = clients.find((client) => client.clientId === selectedClientId);

    return (
        <div className="bg-white flex flex-col h-screen w-full overflow-hidden">
            <AdminNavbar />

            <div className="m-5 flex flex-col items-center relative w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
                <div className="w-full flex items-center justify-between p-4">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search a client"
                            className="w-full text-black text-[14px] pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm transition-all duration-300"
                        />
                        <i
                            onClick={notify}
                            className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    </div>

                    <div
                        className="px-6 py-3 ml-4 rounded-xl text-white bg-green-600 font-semibold shadow-md active:scale-95 cursor-pointer"
                        onClick={() => setIsAddClientModalOpen(true)}
                    >
                        Add Client
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col h-[87vh] w-full overflow-x-auto">
                    {isLoading ? (
                        <div className="h-full w-full flex items-center justify-center text-center text-gray-500">
                            Loading clients...
                        </div>
                    ) : isError ? (
                        <p className="text-center text-red-500">{message}</p>
                    ) : clients.length === 0 ? (
                        <div className="h-full w-full flex items-center justify-center text-center text-gray-500 text-lg font-semibold mt-4">
                            <img draggable="false" src={NCF} alt="Maybe a green turtle holding a sign that says No Clients Found" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {clients.map((client) => (
                                <div
                                    key={client.clientId}
                                    className="bg-white shadow-md rounded-lg p-4 flex items-center hover:border-green-500 space-x-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                                >
                                    <img
                                        src={Turtle}
                                        alt="Client"
                                        className="w-20 h-20 rounded-full border border-blue-500 bg-green-200 p-2"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-md font-semibold text-gray-800">
                                            {client.clientName}
                                        </h3>
                                        <p className="text-xs text-gray-500">{client.clientEmail}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <div className="text-orange-300 hover:text-orange-400 transition-all duration-300 cursor-pointer">
                                            <i className="fa-solid fa-user-pen text-xl"></i>
                                        </div>
                                        <div className="text-red-400 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                            <i className="fa-solid fa-trash text-xl"
                                                onClick={() => handleDeleteClick(client.clientId as number)}
                                            >
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div className="absolute top-[10%] right-0 w-[calc(29%-120px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5">
                {/* Profile Image */}
                <div className="flex flex-col items-center my-4">
                    <img
                        src={Turtle}
                        alt="Profile"
                        className="w-30 h-30 rounded-full border border-blue-500 bg-green-200 p-2"
                    />
                    <h3 className="text-center font-semibold text-gray-800 mt-2">
                        Ninja Turtle
                    </h3>
                </div>
                <div className="mt-6 w-full space-y-4 text-left px-6 flex-1">
                    <p className="flex items-center text-gray-700 text-sm">
                        <i className="fa-solid fa-calendar-days text-green-500 mr-2"></i>
                        <span className="font-semibold ml-1 mr-1">Joined:</span> Feb 19, 2025
                    </p>
                    <p className="flex items-center text-gray-700 text-sm">
                        <i className="fa-solid fa-phone text-green-500 mr-2"></i>
                        <span className="font-semibold ml-1 mr-1">Phone:</span> 09616186616
                    </p>
                    <p className="flex items-center text-gray-700 text-sm">
                        <i className="fa-solid fa-map-marker-alt text-green-500 mr-2"></i>
                        <span className="font-semibold ml-1 mr-1">Address:</span> San Vicente St.
                    </p>
                    <p className="flex items-center text-gray-700 text-sm">
                        <i className="fa-solid fa-id-badge text-green-500 mr-2"></i>
                        <span className="font-semibold ml-1 mr-1">Membership:</span> Premium
                    </p>
                    <p className="flex items-center text-gray-700 text-sm">
                        <i className="fa-solid fa-car text-green-500 mr-2"></i>
                        <span className="font-semibold ml-1 mr-1">Total Orders:</span> 15
                    </p>
                    <p className="flex items-center text-gray-700 text-sm">
                        <i className="fa-solid fa-star text-green-500 mr-2"></i>
                        <span className="font-semibold ml-1 mr-1">Rating:</span> 4.8/5
                    </p>
                </div>

                <div className="w-full mt-4 space-y-3 px-6">
                    <div className="flex items-center justify-center cursor-pointer w-full py-2 text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 text-sm font-semibold active:scale-[.957] select-none">
                        Edit Profile
                    </div>
                </div>

                <p className='mt-4 text-xs text-gray-400'>www.ninjaturtles.com</p>
            </div>

            {isAddClientModalOpen && <AddClientModal onClose={() => setIsAddClientModalOpen(false)} />}
            {isDeleteClientModalOpen && (
                <DeleteClientModal
                    onClose={() => setIsDeleteClientModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    clientName={selectedClient?.clientName}
                    clientEmail={selectedClient?.clientEmail}
                />
            )}

            {/* Toaster Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Client;