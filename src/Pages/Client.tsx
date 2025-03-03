import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { getClients, deleteClient, filterClients } from "../utils/client/clientSlice";
import { ToastContainer, toast } from 'react-toastify';
import AdminNavbar from "../Components/AdminNavbar";
import AddClientModal from "../Components/Modal/AddClientModal";
import DeleteClientModal from "../Components/Modal/DeleteClientModal";
import UpdateClientModal from "../Components/Modal/UpdateClientModal";
import Turtle from "../assets/Images/NT.png";
import NCF from "../assets/Images/NoClientsFound.png";
import ClientInformation from "../Components/ClientInformation";

const Client: React.FC = () => {
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false);
    const [isUpdateClientModalOpen, setIsUpdateClientModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const { clients, filteredClients, isLoading, isError, message } = useSelector(
        (state: RootState) => state.clients
    );

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    useEffect(() => {
        dispatch(filterClients(searchTerm));
    }, [searchTerm, dispatch]);

    const notify = () => toast.success("Wow so easy!");

    // Function to handle delete click
    const handleDeleteClick = (clientId: number) => {
        setSelectedClientId(clientId);
        setIsDeleteClientModalOpen(true);
        toast.dismiss();
    };

    // Function to confirm deletion
    const handleConfirmDelete = async () => {
        if (selectedClientId !== null) {
            await dispatch(deleteClient(selectedClientId));
            dispatch(getClients());
            setIsDeleteClientModalOpen(false);
        }
    };

    // Handle update click
    const handleUpdateClick = (clientId: number) => {
        setSelectedClientId(clientId);
        setIsUpdateClientModalOpen(true);
        toast.dismiss();
    };

    // will display client information on other component
    const handleCardClick = (clientId: number) => {
        setSelectedClientId(clientId);
        toast.dismiss();
    }

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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i
                            onClick={notify}
                            className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    </div>

                    <div
                        className="px-6 py-3 ml-4 rounded-xl text-white bg-green-600 font-semibold shadow-md active:scale-95 cursor-pointer"
                        onClick={() => { setIsAddClientModalOpen(true); toast.dismiss(); }}
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
                    ) : filteredClients.length === 0 ? (
                        <div className="h-full w-full flex items-center justify-center text-center text-gray-500 text-lg font-semibold mt-4">
                            <img draggable="false" src={NCF} alt="Maybe a green turtle holding a sign that says No Clients Found" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {filteredClients.map((client) => (
                                <div
                                    onClick={() => handleCardClick(client.clientId as number)}
                                    key={client.clientId}
                                    className="bg-white shadow-md rounded-lg p-4 flex items-center hover:bg-slate-100 hover:border-green-500 space-x-4 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                                >
                                    <img
                                        src={Turtle}
                                        alt="Client"
                                        className="w-20 h-20 rounded-full border cursor-pointer border-blue-500 bg-green-200 p-2"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-md font-semibold text-gray-800">
                                            {client.clientName}
                                        </h3>
                                        <p className="text-xs text-gray-500">{client.clientEmail}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <div className="text-orange-300 hover:text-orange-400 transition-all duration-300 cursor-pointer">
                                            <i className="fa-solid fa-user-pen text-xl"
                                                onClick={() => handleUpdateClick(client.clientId as number)}
                                            >
                                            </i>
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

            <ClientInformation
                clientName={selectedClient?.clientName}
                clientEmail={selectedClient?.clientEmail}
            />

            {isAddClientModalOpen && <AddClientModal onClose={() => setIsAddClientModalOpen(false)} />}

            {isDeleteClientModalOpen && (
                <DeleteClientModal
                    onClose={() => setIsDeleteClientModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    clientName={selectedClient?.clientName}
                    clientEmail={selectedClient?.clientEmail}
                />
            )}

            {isUpdateClientModalOpen && selectedClient && (
                <UpdateClientModal
                    onClose={() => setIsUpdateClientModalOpen(false)}
                    // onConfirm={handleConfirmUpdate}
                    clientId={selectedClient.clientId}
                    clientName={selectedClient.clientName}
                    clientEmail={selectedClient.clientEmail}
                />
            )}


            {/* Toaster Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Client;