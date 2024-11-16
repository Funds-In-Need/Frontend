"use client";
import React, { useState } from "react";
import { fetchCreditScore } from "../utils/setScore"; // Adjust the path if needed

const FetchCreditScore: React.FC = () => {
  const [userAddress, setUserAddress] = useState<string>("");
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchCreditScore = async () => {
    setLoading(true);
    setError(null);

    try {
      const score = await fetchCreditScore(userAddress);
      setCreditScore(score);
    } catch (err) {
      setError("Failed to fetch credit score. Check console for details.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1>Credit Score Checker</h1>
      <input
        type="text"
        placeholder="Enter User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <button onClick={handleFetchCreditScore} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Credit Score"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {creditScore !== null && <p>Credit Score: {creditScore}</p>}
    </div>
  );
};

export default FetchCreditScore;
