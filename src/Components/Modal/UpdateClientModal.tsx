import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { getClients, updateClient } from "../../utils/client/clientSlice";
import { toast } from 'react-toastify';

interface UpdateClientModalProps {
    onClose: () => void;
    clientId: number;
    clientName: string;
    clientEmail: string;
}

const UpdateClientModal: React.FC<UpdateClientModalProps> = ({
    onClose,
    clientId,
    clientName,
    clientEmail,
}) => {
    const [name, setName] = useState(clientName);
    const [email, setEmail] = useState(clientEmail);
    const dispatch = useDispatch<AppDispatch>();

    const handleUpdate = async () => {
        if (name === clientName && email === clientEmail) {
            toast.info("No changes detected.");
            return;
        }
        await dispatch(updateClient({ clientId, clientData: { clientName: name, clientEmail: email } }));
        dispatch(getClients());
        onClose();
    };

    return (
        <div onClick={onClose} className="z-[1000] fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-xl relative w-full sm:w-96">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Update Client</h2>

                <p className="text-sm text-red-300 mb-6 text-start">
                    CAUTION: Updating a client will immediately affect their credentials in the database.
                </p>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    />
                </div>
                <div className="flex justify-between gap-2">
                    <div
                        onClick={onClose}
                        className="w-full flex items-center justify-center cursor-pointer bg-orange-300 text-white p-2 rounded-md transition active:scale-[.957] select-none"
                    >
                        Cancel
                    </div>
                    <div
                        onClick={handleUpdate}
                        className="w-full flex items-center justify-center cursor-pointer bg-gray-300 text-black p-2 rounded-md transition active:scale-[.957] select-none"
                    >
                        Update
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateClientModal;