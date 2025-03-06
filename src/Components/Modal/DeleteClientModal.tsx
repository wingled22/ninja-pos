const DeleteClientModal: React.FC<{ 
    onClose: () => void; 
    onConfirm: () => void;
    clientName: string | undefined;
    clientEmail: string | undefined;
}> = ({ onClose, onConfirm, clientName, clientEmail }) => {
    return (
        <>
            <div onClick={onClose} className="z-[1000] fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-lg shadow-xl relative w-full sm:w-96">
                    <h2 className="text-xl flex items-center justify-start font-semibold text-red-600 mb-4 text-center">
                        Confirm Delete?
                    </h2>

                    <p className="text-sm text-red-300 mb-6 text-start">
                        WARNING: Deleting a client will permanently remove them from the database.
                    </p>

                    <div className="text-gray-400 mb-6">
                        <p className="text-lg">
                            <i className="fa-solid fa-user mr-2"></i>
                            <span className="text-gray-400 text-sm capitalize">{clientName || "unknown name"}</span>
                        </p>
                        <p className="text-lg">
                            <i className="fa-solid fa-envelope mr-2"></i>
                            <span className="text-gray-400 text-sm">{clientEmail || "unknown name"}</span>
                        </p>
                    </div>

                    <div className="flex justify-between gap-2">
                        <div
                        onClick={onClose} 
                        className="w-full flex items-center justify-center cursor-pointer bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition active:scale-[.957] select-none">
                            Cancel
                        </div>
                        <div
                        onClick={onConfirm} 
                        className="w-full flex items-center justify-center cursor-pointer bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 transition active:scale-[.957] select-none">
                            Confirm
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteClientModal;