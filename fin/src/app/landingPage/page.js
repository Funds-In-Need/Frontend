"use client";
import React, { useEffect, useRef, useState } from "react";

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
