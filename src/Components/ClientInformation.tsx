import Turtle from "../assets/Images/NT.png";

const ClientInformation: React.FC = () => {
    return (
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
                <p className="text-sm text-black">ninjaturtle@gmail.com</p>
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
    );
}

export default ClientInformation;