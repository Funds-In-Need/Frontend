"use client";
import React, { useEffect, useRef, useState } from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { getTransactionsByAddress } from "../../../api/getTransaction";
import { getTokenList } from "../../../api/getTokenList";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (textRef.current) {
      const { width, height, left, top } =
        textRef.current.getBoundingClientRect();
      const xRotation = ((clientY - top) / height - 0.5) * 10;
      const yRotation = ((clientX - left) / width - 0.5) * -10;
      setRotation({ x: xRotation, y: yRotation });
    }
  };

  useEffect(() => {
    if (canvasRef.current && dimensions.width && dimensions.height) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const pixelSize = 20;

      for (let y = 0; y < dimensions.height; y += pixelSize) {
        for (let x = 0; x < dimensions.width; x += pixelSize) {
          ctx.fillStyle = `rgba(${Math.floor(
            100 + Math.random() * 155
          )}, ${Math.floor(Math.random() * 50)}, ${
            200 + Math.random() * 55
          }, 0.5)`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    }
  }, [dimensions]);

  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    setTransactions(null);
    try {
      const result = await getTransactionsByAddress(address);
      setTransactions(result);
    } catch (err) {
      setError("Unable to fetch transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [tokens, setTokens] = useState(null);

  const fetchTokens = async () => {
    setTokens(null);
    if (address) {
      try {
        const result = await getTokenList(address);
        setTokens(result);
      } catch {
        setError("Unable to fetch tokens. Please try again.");
      }
    } else {
      alert("Please enter a valid address.");
    }
  };

  return (
    <div
      className="relative min-h-screen text-white animated-bg"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 2, opacity: 0.3 }}
      />

      {/* Use AnimatedHeader */}
      <AnimatedHeader />

      <main className="relative flex flex-col items-center justify-center min-h-screen z-10 px-6">
        <section className="text-center mb-10">
          <div
            ref={textRef}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <TextHoverEffect
              text="FIN"
              duration={0.3}
              className="text-8xl font-blanka text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 items-center w-full max-w-4xl">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Ethereum address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 rounded-full bg-black bg-opacity-30 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-6">
            <button
              onClick={fetchTransactions}
              className="relative px-6 py-3 group overflow-hidden rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">
                {loading ? "Fetching..." : "Get Transactions"}
              </span>
            </button>
            <button
              onClick={fetchTokens}
              className="relative px-6 py-3 group overflow-hidden rounded-full text-white font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 focus:ring-4 focus:ring-green-300 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Get Tokens</span>
            </button>
          </div>
        </section>

        <section className="mt-10 w-full max-w-4xl text-center">
          {error && <p className="text-red-500 text-lg">{error}</p>}
          {transactions && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Transactions:</h2>
              <ul className="space-y-4">
                {transactions.map((tx, index) => (
                  <li
                    key={index}
                    className="text-lg bg-white bg-opacity-10 p-4 rounded-lg"
                  >
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
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tokens && (
            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">Tokens:</h2>
              <ul className="space-y-4">
                {tokens.map((token, index) => (
                  <li
                    key={index}
                    className="text-lg bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <strong>{token.name}</strong> ({token.symbol}) - Balance:{" "}
                    {token.balance}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
