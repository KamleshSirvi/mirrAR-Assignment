import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

const ProductActions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement your search functionality here
    console.log("Search query:", searchQuery);
  };

  const handleCreateProductClick = () => {
    navigate("/newProduct");
  };

  const handleUpdateProductClick = () => {
    navigate("/updateProduct");
  };

  const handleDeleteProductClick = () => {
    navigate("/deleteProduct");
  };

  return (
    <>
      <div className=" p-4 text-white">
        <div className="container mx-auto md:flex md:items-center md:justify-end gap-5">
          {/* Search Input */}
          <div className="relative pb-5 md:pb-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
              className="bg-gray-700 w-full md:w-48 text-white border-none px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-4 top-3 text-gray-400 focus:outline-none"
            >
              <FaSearch className="items-center" />
            </button>
          </div>

          <button
            onClick={handleCreateProductClick}
            className="bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-700"
          >
            Create Product
          </button>

          <button
            onClick={handleUpdateProductClick}
            className="bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-700"
          >
            Update Product
          </button>

          <button
            onClick={handleDeleteProductClick}
            className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-700"
          >
            Delete Product
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
