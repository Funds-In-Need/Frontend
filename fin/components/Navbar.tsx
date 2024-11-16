"use client";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex items-center justify-between p-4">
      {/* Left Side: Title */}
      <div className="text-3xl font-bold text-gray-200">F.I.N.</div>

      {/* Right Side: Placeholder for Button */}
      <div>
        {/* Placeholder for the button - you can add a button later */}
        <span className="text-gray-400">[Button Here]</span>
      </div>
    </nav>
  );
};

export default Navbar;
