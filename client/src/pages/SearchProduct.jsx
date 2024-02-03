import { useState, useEffect } from "react";
import TruncateParagraph from "../components/TruncateParagraph";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (searchTerm.trim() === "") {
          setSearchResults([]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:4000/api/products/searchProduct?term=${searchTerm}`
        );

        if (response.ok) {
          const productsData = await response.json();
          setSearchResults(productsData);
        } else {
          setError(`No Data found for ${searchTerm}`);
        }
      } catch (error) {
        setError(`Error fetching products data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <>
      <div className="justify-center">
        <div className="relative pb-5 md:pb-0 px-5 flex flex-col">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 w-full md:w-80 text-white border-none px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 mx-auto"
          />
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {searchResults.length === 0 && !loading && !error && (
            <p>No results found for {searchTerm}</p>
          )}

          {searchResults.length > 0 &&
            searchResults.map((product) => (
              <div
                key={product._id}
                className="mt-5 p-2 border rounded w-full md:w-96 mx-auto shadow-lg bg-gray-200"
              >
                <Link to={`/product/${product._id}`}>
                  <h4 className="text-md font-semibold">{product.name}</h4>

                  <TruncateParagraph
                    text={product.description}
                    maxLength={500}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
