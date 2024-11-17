"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Search_Login: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([
    "Transaction History",
    "Collateral Management",
    "Governance Participation",
    "Liquidity Provision",
    "Loan Repayment Behavior",
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isLoading && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setFading(true); // Start fading out
        setTimeout(() => {
          setCurrentStep((prevStep) => prevStep + 1);
          setFading(false); // Reset fading after the change
        }, 500); // Wait 500ms to complete fade-out before changing the word
      }, 2000); // Delay for each step (2 seconds)
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      setIsLoading(false);
      // Start animating the progress to 80%
      setShowProgress(true); // Trigger the fade-in effect for progress
      let progressTimer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 80) {
            clearInterval(progressTimer);
            return 80;
          }
          return prevProgress + 1;
        });
      }, 50); // Increment every 50ms for a smooth animation to 80%
    }
  }, [currentStep, isLoading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  const handleClaim = () => {
    setIsClaimed(true);
  };

  const handleBack = () => {
    // Navigate to the landing page
    router.push("/landingPage");
  };

  return (
    <div className="p-16">
      {/* Search Bar */}
      
      {/* Loading Steps with Progress Bar and Step Counter */}
      <div className="flex flex-col items-center justify-center mt-32 mb-16">
        {isLoading && currentStep < steps.length ? (
          <>
            {/* Step Counter */}
            <div className="text-lg text-gray-200 mb-2">
              Step {currentStep + 1} of {steps.length}
            </div>
            {/* Progress Bar */}
            <div className="w-full max-w-lg bg-gray-300 h-3 mb-4 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
            {/* Step Description with Smooth Transition */}
            <div
              className={`text-4xl text-gray-200 mt-2 transition-opacity duration-500 transform animate-growShrink ${
                fading ? "opacity-0" : "opacity-100"
              }`}
            >
              {steps[currentStep]}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center cursor-pointer">
            {isClaimed ? (
              <>
                {/* Green tick after claiming, centered with slower bounce and blinking effect */}
                <div className="w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center mt-6 animate-slow-bounce">
                  <span className="text-6xl text-green-500 animate-blink flex items-center justify-center">
                    ✔
                  </span>
                </div>

                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="mt-4 text-lg text-gray-200 underline"
                >
                  Back
                </button>
              </>
            ) : (
              // Loading circle with progress percentage until completion
              <div
                onClick={progress >= 80 ? handleClaim : undefined}
                className={`relative w-32 h-32 rounded-full border-4 ${
                  progress < 80
                    ? "border-gray-500"
                    : "border-green-500 hover:bg-green-500"
                } flex items-center justify-center mt-6 group transition duration-300 transform`}
              >
                <span
                  className={`text-2xl ${
                    progress < 80 ? "text-gray-500" : "text-green-500"
                  } transition-opacity duration-500 ${
                    progress < 80 ? "opacity-100" : "group-hover:opacity-0"
                  }`}
                >
                  {progress}%
                </span>
                {progress >= 80 && (
                  <span className="absolute text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Claim
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search_Login;
