"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchNFTData } from "../../../api/getNFT";

const AssessmentCard = () => {
  const [query, setQuery] = useState("");
  const [nft, setNFT] = useState(null); // State to hold NFT data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [animatedValues, setAnimatedValues] = useState<number[]>([]); // Animated progress values
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract the wallet address from the query string
  useEffect(() => {
    const address = searchParams.get("address");
    if (address) {
      setQuery(address);
      fetchNFT(address); // Fetch NFT data based on the address
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const metricValues = metrics.map((metric) => metric.value);
      setAnimatedValues(metricValues);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  


  // Trigger animation for progress bars on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const metricValues = metrics.map((metric) => metric.value);
      setAnimatedValues(metricValues); // Set the animated values to their final state
    }, 100); // Small delay to ensure animation triggers correctly

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const fetchNFT = async (address: string) => {
    try {
      setLoading(true);
      const data = await fetchNFTData(address); // Call your API to fetch NFT data
      setNFT(data[0]); // Assuming the API returns an array of NFTs and you want the first
    } catch (error) {
      console.error("Failed to fetch NFT data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    router.push("/landingPage"); // Navigate back to the landing page
  };

  const generateRandomValue = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const metrics = [
    { label: "Transaction history", value: generateRandomValue(10, 100) },
    { label: "Loan repayment behavior", value: generateRandomValue(10, 100) },
    { label: "Collateral management", value: generateRandomValue(10, 100) },
    { label: "Liquidity provision", value: generateRandomValue(10, 100) },
    { label: "Governance participation", value: generateRandomValue(10, 100) },
  ];

  const calculateGradient = (value: number) => {
    const red = Math.max(255 - value * 2.55, 0); // Red decreases as value increases
    const green = Math.min(value * 2.55, 255); // Green increases as value increases
    return `rgb(${red}, ${green}, 0)`; // Transition from red to green
  };

  return (
    <div className="p-16">
      <div className="flex items-center justify-center mb-12">
        <form className="flex flex-col items-center space-y-6 w-full max-w-lg">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your search..."
              className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full shadow-md border-2 border-black focus:outline-none focus:ring-0 placeholder-gray-400 animate-smooth-glow"
            />
          </div>
        </form>
      </div>

      <div className="flex gap-16">
        {/* Left Section */}
        <div className="flex-1 ml-12">
          <div className="mb-3">
            <button
              onClick={handleBackClick}
              className="text-gray-300 flex items-center hover:text-gray-300"
            >
              <span className="mr-2">←</span>
              <span>BACK</span>
            </button>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl border border-gray-300 border-opacity-50 shadow-md p-10 mx-auto">
            <div className="mb-8">
              <p className="text-l text-gray-200">Address: {query || "..........."}</p>
            </div>

            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-20">
                  <div className="flex items-center w-64">
                    <span className="text-gray-200 mr-4">•</span>
                    <span className="text-l text-gray-200">{metric.label}</span>
                  </div>
                  <div className="w-64 h-4 bg-gray-200 border border-gray-200 overflow-hidden relative">
                    <div
                      className="h-full transition-all duration-2000 ease-in-out"
                      style={{
                        width: `${animatedValues[index] || 0}%`,
                        backgroundColor: calculateGradient(animatedValues[index] || 0),
                        transition: "width 2s ease-in-out, background-color 2s ease-in-out",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

         {/* Right Section */}
         <div className="w-64 pt-5">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl border border-gray-300 border-opacity-50 shadow-md p-10 mx-auto h-full flex items-center justify-center">
            {loading ? (
              <p className="text-gray-200">Loading NFT...</p>
            ) : nft ? (
              <div>
                <img
                  src={nft.image}
                  alt={nft.name || "NFT Image"}
                  className="w-32 h-32 rounded-lg object-cover mb-4"
                />
                <p className="text-l text-gray-200">{nft.name || "Unnamed NFT"}</p>
              </div>
            ) : (
              <p className="text-gray-200">No NFT found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;
