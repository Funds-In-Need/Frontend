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
      <div className="relative group">
        <h1
          className="text-center text-8xl tracking-widest text-white drop-shadow-lg transition-all duration-700 group-hover:tracking-[2rem] opacity-100 group-hover:opacity-0"
          style={{ fontFamily: "Blanka, sans-serif" }}
        >
          FIN
        </h1>
        <h1
          className="flex mb-8 text-center top-0 left-0 text-4xl tracking-normal text-white drop-shadow-lg transition-all duration-700 opacity-0 group-hover:opacity-100"
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
        <div className="relative w-full">
          {/* Input with smooth glowing animation */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your search..."
            className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full shadow-md border-2 border-black focus:outline-none focus:ring-0 placeholder-gray-400 animate-smooth-glow"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between space-x-8">
          <button
            type="button"
            onClick={() => console.log("Mint clicked")}
            className=" text-lg font-semibold uppercase tracking-wider text-white hover:text-green-300 focus:outline-none transition-all"
          >
            Mint
          </button>
          <button
            type="submit"
            className="text-lg font-semibold uppercase tracking-wider text-white hover:text-blue-300 focus:outline-none transition-all"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
