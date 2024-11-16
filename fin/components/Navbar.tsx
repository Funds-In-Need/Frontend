"use client";
import React from "react";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const client = createThirdwebClient({ clientId: "YOUR_CLIENT_ID" });

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex items-center justify-between p-4">
      {/* Left Side: Title */}
      <div className="font-blanka text-3xl font-bold text-gray-200">F I N</div>

      {/* Right Side: Placeholder for Button */}
      <ThirdwebProvider>
        {/* Placeholder for the button - you can add a button later */}
        <ConnectButton client={client} wallets={wallets} />
        </ThirdwebProvider>
    </nav>
  );
};

export default Navbar;
