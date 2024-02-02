import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TruncateParagraph from "../components/TruncateParagraph";

const Home = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8 px-5">
        <h2 className="text-3xl font-semibold mb-4">Products List</h2>
        {loading && <p>Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>No products available.</p>
        )}

        {!loading && products.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <li
                key={product._id}
                className=" p-4 rounded-lg shadow-lg bg-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">
                  {/* {product.description} */}
                  <TruncateParagraph
                    text={product.description}
                    maxLength={500}
                  />
                </p>
                <p className="text-gray-700 mb-2">Price: ${product.price}</p>

                {product.variants && product.variants.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Variants:</h4>
                    <ul className="list-disc pl-4">
                      {product.variants.map((variant, index) => (
                        <li key={index}>
                          {variant.name} - SKU: {variant.sku} - $
                          {variant.additional_cost} - Stock:{" "}
                          {variant.stock_count}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  to={`/product/${product._id}`}
                  className="mt-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
