import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProduct = () => {
  const [productName, setProductName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (!productName) {
        setError("Please enter the product name before deleting.");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/products/${encodeURIComponent(productName)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`Product with name "${productName}" deleted successfully`);
        navigate("/");
      } else {
        setError(`${productName} is not present in the database`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An error occurred while deleting the product.");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Delete Product</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-red-600"
        >
          Delete Product
        </button>
      </div>
    </>
  );
};

export default DeleteProduct;
