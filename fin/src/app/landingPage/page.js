"use client";
import React, { useState } from "react";

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Handle Mouse Movement
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    // Calculate rotation based on cursor position
    const xRotation = ((clientY - top) / height - 0.5) * 100; // Adjust rotation factor as needed
    const yRotation = ((clientX - left) / width - 0.5) * -100;

    setRotation({ x: xRotation, y: yRotation });
  };
  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        background: "radial-gradient(circle at 40% 100%, red, black)",
      }}
    >
      {/* Title on Top Left */}
      <div className="absolute top-4 left-4 text-2xl font-bold">FIN</div>

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        onMouseMove={handleMouseMove}
      >
        {/* Image with Mouse Movement Effect */}
        <div
          className="absolute"
          style={{
            transform: `translate(-5%, -10%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src="/sexyduo.png"
            alt="Decorative PNG"
            className="opacity-70"
            style={{
              height: "200px", // Matches the size of two rows
              width: "200px", // Matches the size of two rows
            }}
          />
        </div>

        {/* First Row: Search Bar */}
        <div className="w-full max-w-md mt-32">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Separator Text */}
        <div className="my-4 text-lg font-semibold">or</div>

        {/* Second Row: Button */}
        <div>
          <button className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow hover:bg-gray-300 transition duration-300">
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}
