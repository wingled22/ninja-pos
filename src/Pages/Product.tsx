import React, { useState } from "react";
import AdminNavbar from "../Components/AdminNavbar";
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
      <div className="m-5 flex flex-col relative w-[calc(100%-25%)] h-[87vh] bg-[#FEFEFE] border border-gray-300 overflow-x-auto scrollbar-none">
        <div
          className="cursor-pointer relative m-3 w-[20%] p-2 text-[14px] rounded-lg bg-green-600 text-white font-semibold flex flex-col items-center justify-center text-md"
          onClick={openModal}
        >
          Add Product
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-opacity-95 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg outline outline-gray-400">
              <h2 className="text-black text-2xl font-bold mb-6">Add Product</h2>
              <form
                action="your_action_url_here"
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    name="product_name"
                    required
                    className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[100%]"
                  >
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="books">Books</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="product-image"
                    name="product_image"
                    required
                    accept="image/*"
                    className="p-2 w-full text-gray-500 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-start">
                  <div
                    onClick={closeModal}
                    className="cursor-pointer w-[100px] p-2 text-[14px] rounded-lg bg-red-600 text-white font-semibold flex flex-col items-center justify-center text-md"
                  >
                    Close
                  </div>
                  <div
                    className="cursor-pointer ml-3 w-[100px] p-2 text-[14px] rounded-lg bg-blue-600 text-white font-semibold flex flex-col items-center justify-center text-md"
                  >
                    Submit
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex item-center justify-center h-[72vh] overflow-x-auto">
          <div className="grid grid-cols-4 gap-[15px] col-span-4 md:col-span-3 m-3">
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-md w-55 h-50 border-1 border-solid border-gray-300 p-3">
              <div className="flex justify-between item-center">
                <div className="border-1 border-solid border-gray-300 rounded-full bg-gray-300">
                  <img
                    className="w-16 h-16 object-contain bearbrand"
                    src={bearbrand}
                    alt="Bear Brand Milk"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[15px] text-gray-800">Bear Brand</div>
                  <p className="text-gray-500 text-[12px]">Milk 25g</p>
                </div>
                <i className="fa-solid fa-trash text-[14px] text-red-500 cursor-pointer"></i>
              </div>
              <div className="flex flex-col italic">
                <span className="text-[13px] text-gray-500">
                  Stock: 5x
                </span>
                <span className="text-[13px] text-gray-500">
                  Price: ₱60.00
                </span>
              </div>
              <div className="flex justify-center">
                <div className="text-[14px] border-1 border-white font-semibold text-center text-white bg-blue-500 rounded-lg p-2 w-[90%] cursor-pointer hover:bg-blue-600 hover:border-gray-700">
                  Edit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[10%] right-0 w-[calc(29%-120px)] h-[90vh] bg-[#FEFEFE] border border-gray-300 flex flex-col p-5">
        <p className="font-bold text-[15px] text-black"> FILTER </p>
        <form onSubmit={handleSubmit} className="w-[50%]">
          <div className="w-64 relative mt-30">
            <label className="block text-md text-gray-700 mb-1 font-bold">
              Select a Product
            </label>
            <select
              id="options"
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[200px]"
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
              className="p-2 text-[14px] font-medium border border-gray-300 rounded-md bg-[#FEFEFE] text-gray-800 w-[200px]"
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
    </div>
  );
};

export default Product;
