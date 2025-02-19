import { useState } from "react";

const AddClientModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => setProfilePicture(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md border border-red-500">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                {/* Close Button */}
                <div
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-red-500 transition"
                >
                    <i className="fa-solid fa-times text-lg"></i>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Add New Client</h2>

                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-4">
                    <label className="cursor-pointer relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-md flex items-center justify-center bg-gray-100">
                            {profilePicture ? (
                                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <i className="fa-solid fa-user text-gray-400 text-4xl"></i>
                            )}
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Click to upload</p>
                </div>

                {/* Input Fields */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full text-black p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full text-black p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full text-black p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="w-full flex items-center justify-center cursor-pointer mt-4 bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-600 active:scale-[.957] select-none transition">
                    Add Client
                </div>
            </div>
        </div>
    );
};

export default AddClientModal;