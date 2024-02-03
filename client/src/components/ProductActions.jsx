import { useNavigate } from "react-router-dom";

const ProductActions = () => {
  const navigate = useNavigate();

  const handleSearchProductClick = () => {
    navigate("/searchProduct");
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
          <div className="relative pb-5 md:pb-0"></div>
          <button
            onClick={handleSearchProductClick}
            className="bg-gray-500 flex items-center text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-700"
          >
            Search Product
          </button>

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
        <h3 className="text-lg font-bold mb-2">Search Results</h3>
      </div>
    </>
  );
};

export default ProductActions;
