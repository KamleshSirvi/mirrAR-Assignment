// import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full text-white">
      <div className="container mx-auto flex items-center justify-between md:px-24">
        <div className="flex items-center">
          <span className="font-bold text-lg">E-COMMERCE</span>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex items-center">
            <img
              src="/images/dummy-user.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="mr-2">John</span>
          </div>

          <FaShoppingCart className="text-2xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
