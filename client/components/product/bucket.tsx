/* eslint-disable @next/next/no-img-element */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeProduct, clearBucket } from "@/store/bucketSlice";
import { FiTrash2, FiX, FiShoppingCart } from "react-icons/fi";

const Bucket = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.bucket.products);

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const priceValue = parseFloat(product.price.replace(/[^\d.-]/g, "")) || 0;
      return total + priceValue;
    }, 0);
  };

  const totalPrice = calculateTotal();

  // Calculate dynamic height based on product count
  const getBucketHeight = () => {
    const baseHeight = 200; // Minimum height in pixels
    const itemHeight = 100; // Approximate height per item
    const maxHeight = 600; // Maximum height in pixels

    const calculatedHeight = baseHeight + products.length * itemHeight;
    return Math.min(calculatedHeight, maxHeight);
  };

  return (
    <div
      className="bg-transparent rounded-xl shadow-md overflow-hidden flex flex-col"
      style={{
        height: `${getBucketHeight()}px`,
        transition: "height 0.3s ease",
        minHeight: "200px",
      }}
    >
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
          <FiShoppingCart />
          <span>Your Bucket ({products.length})</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {products.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="text-gray-400 mb-2">
              <FiShoppingCart size={48} />
            </div>
            <h3 className="text-lg font-medium text-gray-500">
              Your bucket is empty
            </h3>
            <p className="text-gray-400 mt-1">
              Add some products to get started
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {products.map((product, idx) => (
              <li key={idx} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-green-600 font-semibold">
                      {product.price}
                    </p>
                    {product.url && (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline truncate block"
                      >
                        View product
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => dispatch(removeProduct(idx))}
                    className="text-gray-400 hover:text-red-500 p-1"
                    aria-label={`Remove ${product.name}`}
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {products.length > 0 && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Total Items:</span>
            <span className="font-semibold">{products.length}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total Price:</span>
            <span className="font-semibold text-green-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => dispatch(clearBucket())}
            className="w-full py-2 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <FiTrash2 size={16} />
            <span>Clear Bucket</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Bucket;
