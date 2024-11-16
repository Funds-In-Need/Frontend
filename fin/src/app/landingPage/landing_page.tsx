"use client";

import React, { useState } from "react";

const LandingPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Animated Heading */}
      <div className="relative group mb-12">
        <h1
          className="text-center text-8xl tracking-widest text-white drop-shadow-lg transition-all duration-1000 group-hover:opacity-0"
          style={{ fontFamily: "Blanka, sans-serif" }}
        >
          FIN
        </h1>
        <h1
          className="absolute top-0 text-center text-4xl tracking-normal text-white drop-shadow-lg opacity-0 transition-all duration-1000 group-hover:opacity-100"
          style={{ fontFamily: "VCR_OSD_MONO, monospace" }}
        >
          Fund In Need
        </h1>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col items-center space-y-6 w-full max-w-lg"
      >
        {/* Input with smooth glowing animation */}
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your search..."
            className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full shadow-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 animate-smooth-glow"
          />
        </div>

        {/* Buttons in the same row */}
        <div className="flex space-x-8">
          <button
            type="button"
            onClick={() => console.log("Mint clicked")}
            className="px-6 py-2 text-lg font-semibold uppercase tracking-wider text-white bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none transition-all"
          >
            Mint
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-lg font-semibold uppercase tracking-wider text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none transition-all"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
