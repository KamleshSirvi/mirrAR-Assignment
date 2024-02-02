import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    variants: [
      {
        name: "",
        sku: "",
        additional_cost: "",
        stock_count: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleVariantChange = (e, index) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      const updatedVariants = [...prevProduct.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [name]: value,
      };
      return { ...prevProduct, variants: updatedVariants };
    });
  };

  const handleRemoveVariant = (index) => {
    setProduct((prevProduct) => {
      const updatedVariants = [...prevProduct.variants];
      updatedVariants.splice(index, 1);
      return { ...prevProduct, variants: updatedVariants };
    });
  };

  const handleAddVariant = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: [
        ...prevProduct.variants,
        {
          name: "",
          sku: "",
          additional_cost: "",
          stock_count: "",
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!product.name || !product.description || !product.price) {
        setError("Please fill in all required fields.");
        return;
      }
      const response = await fetch(
        "http://localhost:4000/api/products/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        console.log("Product submitted:", product);
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        {product.variants.map((variant, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <h4 className="text-lg font-semibold mb-2">
                Variant {index + 1}
              </h4>
              <button
                type="button"
                onClick={() => handleRemoveVariant(index)}
                className="ml-2 p-2 rounded-full  text-gray-700 focus:outline-none"
              >
                <IoIosCloseCircleOutline className="text-xl" />
              </button>
            </div>

            {/* name */}
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
              className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {/* sku */}
            <label
              htmlFor={`variantName${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              SKU:
            </label>
            <input
              type="text"
              id={`variantName${index}`}
              name="sku"
              value={variant.sku}
              onChange={(e) => handleVariantChange(e, index)}
              className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            />

            {/* additional_cost */}
            <label
              htmlFor={`variantName${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              additional_cost:
            </label>
            <input
              type="number"
              id={`variantName${index}`}
              name="additional_cost"
              value={variant.additional_cost}
              onChange={(e) => handleVariantChange(e, index)}
              className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            />

            {/* stock_count */}
            <label
              htmlFor={`variantName${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              stock_count:
            </label>
            <input
              type="number"
              id={`variantName${index}`}
              name="stock_count"
              value={variant.stock_count}
              onChange={(e) => handleVariantChange(e, index)}
              className="border border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
