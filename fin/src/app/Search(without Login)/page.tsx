"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AssessmentCard = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  const metrics = [
    { label: "Transaction history", value: 85 },
    { label: "Loan repayment behavior", value: 45 },
    { label: "Collateral management", value: 20 },
    { label: "Liquidity provision", value: 75 },
    { label: "Governance participation", value: 15 },
  ];

  const getProgressBarColor = (value: number) => {
    if (value >= 70) return "bg-green-600";
    if (value >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  const handleBackClick = () => {
    // Navigate to the landing page
    router.push("/landingPage");
  };

  return (
    <div className="p-16">
      {/* Search Bar */}
      <div className="flex items-center justify-center mb-12">
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center space-y-6 w-full max-w-lg"
        >
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

      {/* Main Content */}
      <div className="flex gap-16">
        {/* Left Section */}
        <div className="flex-1 ml-12">
          {/* Back Button */}
          <div className="mb-3">
            <button
              onClick={handleBackClick}
              className="text-gray-300 flex items-center hover:text-gray-300"
            >
              <span className="mr-2">←</span>
              <span>BACK</span>
            </button>
          </div>

          {/* Card with Smoother Borders */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl border border-gray-300 border-opacity-50 shadow-md p-10 mx-auto">
            <div className="mb-8">
              <p className="text-l text-gray-200">
                Address...................................
              </p>
            </div>

            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-20">
                  <div className="flex items-center w-64">
                    <span className="text-gray-200 mr-4">•</span>
                    <span className="text-l text-gray-200">{metric.label}</span>
                  </div>
                  <div className="w-64 h-4 bg-gray-200 border border-gray-200">
                    <div
                      className={`h-full ${getProgressBarColor(
                        metric.value
                      )} transition-all duration-300`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-64 pt-5">
          <div className="space-y-6">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center">
                <span className="text-blue-500 mr-2">+</span>
                <span className="text-l text-blue-500">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center">
              <span className="text-2xl text-blue-500">80%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;
