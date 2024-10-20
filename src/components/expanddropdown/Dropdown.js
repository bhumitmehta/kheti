import React, { useState } from "react";

const Dropdown = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-[#F5F5F5]"
      >
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-lg mb-4 font-semibold  pb-1 ml-6">{title}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="py-2 space-y-2 absolute bg-white shadow-md rounded-md z-10 w-full">
          {options.map((option, index) => (
            <li key={index}>
              <div
                href="#"
                onClick={closeDropdown}
                className="flex items-center w-full p-2 text-black transition duration-75 rounded-lg pl-6 group hover:bg-[#05bc05] hover:text-white"
              >
                {/* Check if option contains an image */}
                {option.image && (
                  <img src={option.image} alt={option.text} className="w-6 h-6 mr-2" />
                )}
                {option}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
