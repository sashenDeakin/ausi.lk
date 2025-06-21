/* eslint-disable @next/next/no-img-element */
"use client";

import { addProduct } from "@/store/bucketSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Bucket from "./bucket";
import { LuLoaderCircle } from "react-icons/lu";
import { FiExternalLink, FiShoppingCart, FiX } from "react-icons/fi";

interface ScrapeResult {
  title: string;
  price: string;
  image: string | null;
  url?: string;
}

const ChemistWareHouse = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ScrapeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBucket, setShowBucket] = useState(false);

  const handleScrape = async () => {
    setError(null);
    setData(null);

    if (!url.trim()) {
      setError("Please enter a product URL.");
      return;
    }

    if (!url.includes("chemistwarehouse.com.au")) {
      setError("Please enter a valid Chemist Warehouse URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/scrape?url=${encodeURIComponent(url)}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch data");
      }

      setData({
        title: result.title || "No title found",
        price: result.price || "No price found",
        image: result.image || null,
        url: url,
      });
    } catch (error) {
      setError((error as string) || "Unknown error occurred");
    }
    setLoading(false);
  };

  const handleAddToBucket = () => {
    if (data) {
      dispatch(
        addProduct({
          name: data.title,
          price: data.price,
          image: data.image!,
          url: data.url,
        })
      );
      setUrl("");
      setData(null);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            Chemist Warehouse Product
          </h1>
          <p className="text-gray-600 mt-2">
            Enter a product URL to check details and add to your bucket
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label
                    htmlFor="product-url"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product URL
                  </label>
                  <input
                    id="product-url"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.chemistwarehouse.com.au/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleScrape}
                    className={`w-full md:w-auto py-2 px-6 text-white rounded-md transition flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LuLoaderCircle className="animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <FiExternalLink />
                        <span>Check Product</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </div>
              )}

              {data && (
                <div className="mt-6 space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-4">
                    {data.image ? (
                      <div className="w-full md:w-1/3 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={data.image}
                          alt={data.title}
                          className="w-full h-48 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full md:w-1/3 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center h-48">
                        <span className="text-gray-400">
                          No image available
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-semibold">
                        {data.title}
                      </h2>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        {data.price}
                      </p>
                      <div className="mt-4">
                        <button
                          onClick={handleAddToBucket}
                          className="py-2 px-6 text-white bg-green-600 hover:bg-green-700 rounded-md flex items-center gap-2"
                          disabled={!data}
                          aria-disabled={!data}
                        >
                          <FiShoppingCart />
                          <span>Add to Bucket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {data.url && (
                    <div className="text-sm text-gray-500 mt-2">
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center gap-1"
                      >
                        <FiExternalLink size={14} />
                        View original product page
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={`lg:w-96 ${showBucket ? "block" : "hidden"} lg:block`}
          >
            <div className="bg-transparent p-6 rounded-xl  sticky top-6 h-[calc(100vh-3rem)] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                {/*                 <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                  <FiShoppingCart />
                  <span>Your Bucket</span>
                </h2> */}
                <button
                  onClick={() => setShowBucket(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>

              <Bucket />
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowBucket(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 z-10"
        >
          <FiShoppingCart size={24} />
          <span className="sr-only">View Bucket</span>
        </button>
      </div>
    </div>
  );
};

export default ChemistWareHouse;
