import Turtle from "../assets/Images/NINJA TURTLES.png";
import "../assets/CSS/Client.css";

const ClientInformation: React.FC<{
    clientName: string | undefined,
    clientEmail: string | undefined
}> = ({ clientName, clientEmail }) => {
    return (
        <div className="absolute top-[10%] right-0 w-[calc(29%-120px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col">
            {/* Profile Image */}
            <div className="h-[50%] flex flex-col items-center border overflow-hidden relative bg-green-200">
                <img
                    src={Turtle}
                    alt="Profile"
                    className="h-full w-full object-contain p-2 animate-float"
                />
                <div className="flex flex-col items-start justify-center w-full absolute bottom-0 p-2 bg-gradient-to-t from-black/30 to-transparent leading-[1.2em]">
                    <h3 className="text-[20px] text-gray-800">
                        {clientName || "Ninja Turtle"}
                    </h3>
                    <p className="text-xs text-black">
                        {clientEmail || "ninjaturtle@gmail.com"}
                    </p>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-2 p-2 flex-1">
                <div className="flex flex-col items-start text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-calendar-days text-green-600 text-2xl mr-2"></i>
                        <span className="font-semibold">Joined:</span>
                    </div>
                    <span className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">
                        Feb 19, 2025
                    </span>
                </div>
                <div className="flex flex-col items-start text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-phone text-green-600 text-2xl mr-2"></i>
                        <span className="font-semibold">Phone:</span>
                    </div>
                    <span className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">09616186616</span>
                </div>
                <div className="flex flex-col items-start text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-map-marker-alt text-green-600 text-2xl mr-2"></i>
                        <span className="font-semibold">Address:</span>
                    </div>
                    <span className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">San Vicente St.</span>
                </div>
                <div className="flex flex-col items-start text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-id-badge text-green-600 text-2xl mr-2"></i>
                        <span className="font-semibold">Membership:</span>
                    </div>
                    <span className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">Premium</span>
                </div>
                <div className="flex flex-col items-start text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-car text-green-600 text-2xl mr-2"></i>
                        <span className="font-semibold">Total Orders:</span>
                    </div>
                    <span className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">15</span>
                </div>
                <div className="flex flex-col items-start text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-star text-green-600 text-2xl mr-2"></i>
                        <span className="font-semibold">Rating:</span>
                    </div>
                    <span className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">4.8/5</span>
                </div>
            </div>

            <div className="w-full space-y-3 px-4">
                <div className="flex items-center justify-center cursor-pointer w-full py-2 text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 text-sm font-semibold active:scale-[.957] select-none">
                    Edit Profile
                </div>
            </div>

            <p className='w-full text-center mt-2 mb-2 text-sm text-gray-400'>www.ninjaturtles.com</p>
        </div >
    );
}

export default ClientInformation;