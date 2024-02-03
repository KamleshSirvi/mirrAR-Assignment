import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/${_id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(`data ${data}`);
          setProduct(data);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <>
      <div className="container mx-auto mt-8">
        {product ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 mb-4">
              Price: ${product.price.toLocaleString()}
            </p>

            {product.variant && product.variant.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Variants:</h3>
                <ul className="list-disc pl-4">
                  {product.variant.map((variant, index) => (
                    <li
                      key={index}
                      className="mb-2 p-2 border rounded bg-gray-200"
                    >
                      <strong>{variant.name}</strong> - SKU(Stock keeping unit):{" "}
                      {variant.sku}, Additional cost: $
                      {variant.additional_cost.toLocaleString()} , Stock:{" "}
                      {variant.stock_count}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
