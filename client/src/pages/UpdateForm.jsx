import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { _id } = useParams();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    variants: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/${_id}`
        );
        if (response.ok) {
          const data = await response.json();

          const variantsArray = data.variant || [];
          setNewProduct({
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
            variants: variantsArray,
          });
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!newProduct.name || !newProduct.description || !newProduct.price) {
        setError("Please fill in all required fields.");
        return;
      }
      const response = await fetch(
        `http://localhost:4000/api/products/updateExistingProduct/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (response.ok) {
        console.log("Product updated successfully!");
        navigate("/");
      } else {
        setError("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An error occurred while submitting the product.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleVariantChange = (e, index) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => {
      const updatedVariants = [...prevProduct.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [name]: value,
      };
      return { ...prevProduct, variants: updatedVariants };
    });
  };

  const handleAddVariant = () => {
    setNewProduct((prevProduct) => {
      return {
        ...prevProduct,
        variants: [
          ...prevProduct.variants,
          { name: "", sku: "", additional_cost: "", stock_count: "" },
        ],
      };
    });
  };

  const handleRemoveVariant = (index) => {
    setNewProduct((prevProduct) => {
      const updatedVariants = [...prevProduct.variants];
      updatedVariants.splice(index, 1);

      return { ...prevProduct, variants: updatedVariants };
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg"
      >
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
          {newProduct ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Update Product</h2>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {newProduct.variants && newProduct.variants.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Variants:</h3>
                  <ul className="list-disc pl-4">
                    {newProduct.variants.map((variant, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h4 className="text-lg font-semibold mb-2">
                            Variant {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(index)}
                            className="ml-2 p-2 rounded-full text-gray-700 focus:outline-none"
                          >
                            Remove
                          </button>
                        </div>

                        <label
                          htmlFor={`variantName${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Name:
                        </label>
                        <input
                          type="text"
                          id={`variantName${index}`}
                          name="name"
                          value={variant.name}
                          onChange={(e) => handleVariantChange(e, index)}
                          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />

                        <label
                          htmlFor={`variantSku${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          SKU:
                        </label>
                        <input
                          type="text"
                          id={`variantSku${index}`}
                          name="sku"
                          value={variant.sku}
                          onChange={(e) => handleVariantChange(e, index)}
                          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />

                        <label
                          htmlFor={`variantAdditionalCost${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Additional Cost:
                        </label>
                        <input
                          type="number"
                          id={`variantAdditionalCost${index}`}
                          name="additional_cost"
                          value={variant.additional_cost}
                          onChange={(e) => handleVariantChange(e, index)}
                          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />

                        <label
                          htmlFor={`variantStockCount${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Stock Count:
                        </label>
                        <input
                          type="number"
                          id={`variantStockCount${index}`}
                          name="stock_count"
                          value={variant.stock_count}
                          onChange={(e) => handleVariantChange(e, index)}
                          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </ul>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
                >
                  Add Variant
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? "Updatting..." : "Update"}
                </button>
              </div>
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      </form>
    </>
  );
};

export default UpdateForm;
