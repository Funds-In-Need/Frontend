import React from "react";

const AssessmentCard = () => {
  const metrics = [
    { label: "Transaction history", value: 85 },
    { label: "Loan repayment behavior", value: 45 },
    { label: "Collateral management", value: 20 },
    { label: "Liquidity provision", value: 75 },
    { label: "Governance participation", value: 15 },
  ];

  const getProgressBarColor = (value) => {
    if (value >= 70) return "bg-green-400";
    if (value >= 30) return "bg-orange-300";
    return "bg-red-300";
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-gray-500">F.I.N.</h1>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md">
          CONNECT WALLET
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-16">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Enter Address search"
            className="w-full px-4 py-2 border rounded-md"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2"></button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-16">
        {/* Left Section */}
        <div className="flex-1 ml-12">
          {/* Back Button */}
          <div className="mb-3">
            <button className="text-gray-500 flex items-center hover:text-gray-700">
              <span className="mr-2">←</span>
              <span>BACK</span>
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-10 mx-auto">
            <div className="mb-8">
              <p className="text-l text-gray-500">
                Address...................................
              </p>
            </div>

            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-20">
                  <div className="flex items-center w-64">
                    <span className="text-gray-500 mr-4">•</span>
                    <span className="text-l text-gray-500">{metric.label}</span>
                  </div>
                  <div className="w-64 h-4 bg-gray-200 border border-gray-300">
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
