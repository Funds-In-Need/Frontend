// components/ThirdwebProviderWrapper.tsx
"use client";

import React from "react";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const activeChain = ChainId.Goerli; // Replace with your target chain (e.g., Mainnet, Testnet, etc.).

const ThirdwebProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThirdwebProvider activeChain={activeChain}>{children}</ThirdwebProvider>;
};

export default ThirdwebProviderWrapper;
