"use client";
import React, { useEffect, useRef, useState } from "react";
import { getTransactionsByAddress } from "../../../api/getTransaction";
import { getTokenList } from "../../../api/getTokenList";

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Handle Mouse Movement
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      imageRef.current.getBoundingClientRect();

    // Calculate rotation based on cursor position
    const xRotation = ((clientY - top) / height - 0.5) * 10; // Adjust rotation factor as needed
    const yRotation = ((clientX - left) / width - 0.5) * -10;

    setRotation({ x: xRotation, y: yRotation });
  };

  // Create pixelated background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Set the pixel size
    const pixelSize = 20;

    // Loop through the canvas and fill it with rectangles to create the pixelated effect
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        // Set random shade for each rectangle to create a pixelated effect
        ctx.fillStyle = `rgb(${Math.floor(200 + Math.random() * 55)}, 0, 0)`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }, []);

  // const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getTransactionsByAddress(address);
      setTransactions(result);
    } catch (err) {
      setError(err.message || "An error occurred while fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  const [tokens, setTokens] = useState(null);  // Tokens state (no type annotation)
  const [address, setAddress] = useState('');   // Ethereum address state (no type annotation)

  const handleFetchTokens = async () => {
    if (address) {
      const result = await getTokenList(address);
      setTokens(result);
    } else {
      alert('Please enter a valid address.');
    }
  };

  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        background: "radial-gradient(circle at 40% 100%, red, black)",
      }}
      onMouseMove={handleMouseMove} // Move this to the outermost container
    >
      {/* Pixelated Canvas Background */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute inset-0"
        style={{ zIndex: 1, opacity: 0.3 }}
      ></canvas>

      {/* Title on Top Left */}
      <div
        className="absolute top-4 left-4 text-2xl font-bold"
        style={{ zIndex: 2 }}
      >
        FIN
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        onMouseMove={handleMouseMove}
        style={{ zIndex: 3 }}
      >
        {/* Image with Mouse Movement Effect */}
        <div
          ref={imageRef}
          className="absolute"
          style={{
            transform: `translate(-50%, -120%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            top: "50%",
            left: "50%",
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src="/sexyduo.png"
            alt="logo"
            className="opacity-70"
            style={{
              height: "200px", // Matches the size of two rows
              width: "200px", // Matches the size of two rows
            }}
          />
        </div>

        <div className="mt-40 p-10 z-10">
          <h1 className="text-xl font-bold mb-4 text-white">Fetch Ethereum Transactions</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Ethereum address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-min-30 w-80 mb-4 p-2 border text-black rounded z-index z-10"
            />

            <button
              onClick={handleFetchTransactions}
              className="bg-blue-500 text-white py-2 px-4 rounded w-min-10 w-30 ml-2 h-10 z-index z-10"
            >
              {loading ? "Loading..." : "Get Transactions"}
            </button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {transactions && (
            <div className="mt-6 z-10">
              <h2 className="text-lg font-semibold mb-2">Transactions:</h2>
              {transactions.length > 0 ? (
                <ul className="space-y-4">
                  {transactions.map((tx, index) => (
                    <li key={index} className="p-4 border rounded bg-gray-50">
                      <div className="gap-4 text-black">
                        <p>
                          <strong>Hash:</strong> {tx.hash}
                        </p>
                        <p>
                          <strong>From:</strong> {tx.from}
                        </p>
                        <p>
                          <strong>To:</strong> {tx.to}
                        </p>
                        <p>
                          <strong>Value:</strong> {tx.value} Wei
                        </p>
                        <p>
                          <strong>Block Number:</strong> {tx.blockNumber}
                        </p>
                        <p>
                          <strong>Timestamp:</strong>{" "}
                          {new Date(tx.timeStamp * 1000).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions found for the given address and block range.</p>
              )}
            </div>
          )}
        </div>

        <div className="z-10">
          <h1>Check Owned Tokens</h1>
          <input
            type="text"
            placeholder="Enter Ethereum address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}  // Update address state
          />
          <button onClick={handleFetchTokens}>Get Token List</button>

          {/* Display tokens or a message */}
          {tokens ? (
            <ul>
              {tokens.map((token, index) => (
                <li key={index}>
                  <strong>{token.name}</strong> ({token.symbol}) - Balance: {token.balance}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tokens found or invalid address</p>
          )}
        </div>

        {/* Separator Text */}
        {/* <div className="my-4 text-lg font-semibold">or</div> */}

        {/* Second Row: Button */}
        {/* <div>
          <button className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow hover:bg-gray-300 transition duration-300">
            Click Me
          </button>
        </div> */}
      </div>
    </div>
  );
}
