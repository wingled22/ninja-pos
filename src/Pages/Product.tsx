import React, { useState } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import "../assets/CSS/Product.css";
import bearbrand from "../assets/Images/berabrand-1.png";

const Product: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);
  };
  return (
    <div className="bg-white flex flex-col flex-1 h-full w-full">
      <AdminNavbar />
      <div className="absolute top-[10%] right-0 w-[calc(29%-100px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5 z-10">
        <p className="mx-auto font-bold filter"> Filter </p>
        <form onSubmit={handleSubmit}>
          <div className="w-64 relative mt-30">
            <label className="block text-md text-gray-700 mb-1 font-bold">
              Select a Product
            </label>
            <select
              id="options"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className="w-64 relative mt-10">
            <label className="block text-md font-bold text-gray-700 mb-1">
              Select a Category
            </label>
            <select
              id="options"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </form>
      </div>
      <div className="flex-1 flex justify-start relative">
        <div className="cursor-pointer select-none absolute top-4 left-4 p-4 rounded-lg bg-gray-400 text-white font-semibold flex flex-col items-center justify-center text-xl" onClick={openModal}>
          Add Product
        </div>

        {isOpen && (
        <div className="fixed inset-0  bg-opacity-95 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            <p className="text-gray-700 mb-4">This is a simple modal example.</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
      
        <div className="grid grid-cols-12 pt-18">
          <div className="col-span-12 md:col-span-3 pt-4 px-2">
            <div className="max-w-xs bg-white rounded-xl shadow-md w-60 h-56 border-2 border-solid border-gray-300">
              <div className="flex justify-evenly item-center">
                <img
                  className="w-16 h-16 object-contain bearbrand"
                  src={bearbrand}
                  alt="Bear Brand Milk"
                />
                <div className="px-6 py-3">
                  <div className="font-bold text-lg mb-2">Bear Brand</div>
                  <p className="text-gray-500 text-base">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash"></i>
              </div>
              <div className="px-6 pt-4">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Stock: 5x</i>
                </span>
              </div>
              <div className="px-6">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Price: ₱60.00</i>
                </span>
              </div>
              <div className="flex justify-center pt-2">
                <button className="font-semibold text-white py-2 px-4 rounded-lg Edit w-50 cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 pt-4 px-2">
            <div className="max-w-xs bg-white rounded-xl shadow-md w-60 h-56 border-2 border-solid border-gray-300">
              <div className="flex justify-evenly item-center">
                <img
                  className="w-16 h-16 object-contain bearbrand"
                  src={bearbrand}
                  alt="Bear Brand Milk"
                />
                <div className="px-6 py-3">
                  <div className="font-bold text-lg mb-2">Bear Brand</div>
                  <p className="text-gray-500 text-base">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash"></i>
              </div>
              <div className="px-6 pt-4">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Stock: 5x</i>
                </span>
              </div>
              <div className="px-6">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Price: ₱60.00</i>
                </span>
              </div>
              <div className="flex justify-center pt-2">
                <button className="font-semibold text-white py-2 px-4 rounded-lg Edit w-50 cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 pt-4 px-2">
            <div className="max-w-xs bg-white rounded-xl shadow-md w-60 h-56 border-2 border-solid border-gray-300">
              <div className="flex justify-evenly item-center">
                <img
                  className="w-16 h-16 object-contain bearbrand"
                  src={bearbrand}
                  alt="Bear Brand Milk"
                />
                <div className="px-6 py-3">
                  <div className="font-bold text-lg mb-2">Bear Brand</div>
                  <p className="text-gray-500 text-base">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash"></i>
              </div>
              <div className="px-6 pt-4">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Stock: 5x</i>
                </span>
              </div>
              <div className="px-6">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Price: ₱60.00</i>
                </span>
              </div>
              <div className="flex justify-center pt-2">
                <button className="font-semibold text-white py-2 px-4 rounded-lg Edit w-50 cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 pt-4 px-2">
            <div className="max-w-xs bg-white rounded-xl shadow-md w-60 h-56 border-2 border-solid border-gray-300">
              <div className="flex justify-evenly item-center">
                <img
                  className="w-16 h-16 object-contain bearbrand"
                  src={bearbrand}
                  alt="Bear Brand Milk"
                />
                <div className="px-6 py-3">
                  <div className="font-bold text-lg mb-2">Bear Brand</div>
                  <p className="text-gray-500 text-base">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash"></i>
              </div>
              <div className="px-6 pt-4">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Stock: 5x</i>
                </span>
              </div>
              <div className="px-6">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Price: ₱60.00</i>
                </span>
              </div>
              <div className="flex justify-center pt-2">
                <button className="font-semibold text-white py-2 px-4 rounded-lg Edit w-50 cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 pt-4 px-2">
            <div className="max-w-xs bg-white rounded-xl shadow-md w-60 h-56 border-2 border-solid border-gray-300">
              <div className="flex justify-evenly item-center">
                <img
                  className="w-16 h-16 object-contain bearbrand"
                  src={bearbrand}
                  alt="Bear Brand Milk"
                />
                <div className="px-6 py-3">
                  <div className="font-bold text-lg mb-2">Bear Brand</div>
                  <p className="text-gray-500 text-base">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash"></i>
              </div>
              <div className="px-6 pt-4">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Stock: 5x</i>
                </span>
              </div>
              <div className="px-6">
                <span className="py-1 text-lg text-gray-500 mr-2 mb-2">
                  <i>Price: ₱60.00</i>
                </span>
              </div>
              <div className="flex justify-center pt-2">
                <button className="font-semibold text-white py-2 px-4 rounded-lg Edit w-50 cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          </div>


          
        </div>
      </div>
    </div>
  );
};

export default Product;
