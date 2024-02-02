import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [isProductPresent, setIsProductPresent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFind = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/products/findProduct/${encodeURIComponent(
          productName
        )}`
      );

      if (response.ok) {
        const data = await response.json();

        const id = data._id;

        navigate(`/updateproduct/${id}`);
      } else {
        console.error(`Failed to find product with name "${productName}"`);
        setIsProductPresent(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Find Product</h2>

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
          onClick={handleFind}
          className="bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-red-600"
        >
          {isLoading ? "Finding..." : "Find Product"}
        </button>

        {!isProductPresent && <p> Product is not present </p>}
      </div>
    </>
  );
};

export default UpdateProduct;
