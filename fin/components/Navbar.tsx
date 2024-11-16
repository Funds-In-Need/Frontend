// src/components/Navbar.tsx
"use client";

import React from "react";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";

const Navbar: React.FC = () => {
  const address = useAddress(); // Fetch the connected wallet address

  return (
    <nav className="w-full flex items-center justify-between p-4">
      {/* Left Side: Title */}
      <div className="font-blanka text-3xl font-bold text-gray-200">F I N</div>

      {/* Right Side: Wallet Connection */}
      <div className="flex items-center space-x-4">
        {address ? (
          <p className="text-sm text-gray-200">Connected: {address}</p>
        ) : (
          <p className="text-sm text-gray-400">Wallet Not Connected</p>
        )}
        <ConnectWallet />
      </div>
    </nav>
  );
};

export default Navbar;
