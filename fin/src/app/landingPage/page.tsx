"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation
import { useAddress } from "@thirdweb-dev/react";

const LandingPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const customLayoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize router for navigation

  const address = useAddress(); // Fetch the connected wallet address

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to the SearchXL page with the entered address
      router.push(`/SearchXL?address=${encodeURIComponent(query)}`);
    } else {
      alert("Please enter an address to search!");
    }
  };

  const handleMint = () => {
    // Navigate to the Search_Login page
    router.push(`/Mint`);
  };

  const scrollToCustomLayout = () => {
    customLayoutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-white min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
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

        {/* Wallet Connection Status */}
        <div className="mb-8">
          <h2 className="text-2xl">
            {address
              ? `Connected Wallet: ${address}`
              : "Connect your wallet using the Navbar"}
          </h2>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch} // Attach navigation logic to form submission
          className="flex flex-col items-center space-y-6 w-full max-w-lg"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Address..."
              className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full shadow-md border-2 border-black focus:outline-none focus:ring-0 placeholder-gray-400"
            />
          </div>
          <div
            className={`flex ${address ? "justify-between" : "justify-center"} space-x-8`}
          >
            {address && (
              <button
                type="button"
                onClick={handleMint} // Navigate to Search_Login
                className="text-lg font-semibold uppercase tracking-wider text-white hover:text-green-300 focus:outline-none transition-all"
              >
                Mint
              </button>
            )}
            <button
              type="submit"
              className="text-lg font-semibold uppercase tracking-wider text-white hover:text-blue-300 focus:outline-none transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Scroll Down Button */}
        <div className="mt-8">
          <button
            onClick={scrollToCustomLayout}
            className="px-8 py-3 bg-yellow-500 text-black font-semibold uppercase tracking-wider rounded-full hover:bg-yellow-400 focus:outline-none transition-all"
          >
            Go Down
          </button>
        </div>
      </div>
 

 



{/* Custom Layout Section */}
<div ref={customLayoutRef} className="bg-black text-white min-h-screen p-6 ">
  {/* MVP Highlights Row */}
  <div className="relative overflow-hidden">
    <div className="flex space-x-12 animate-slide-left">
      {/* Card 1 */}
      <div className=" p-4 rounded-lg shadow-md text-center text-white min-w-[200px]">
        <h3 className="text-2xl ">5+ Blockchains Supported</h3>
      </div>
      {/* Card 2 */}
      <div className=" p-4 rounded-lg shadow-md text-center text-white min-w-[200px]">
        <h3 className="text-2xl ">Powered by 10+ Protocols</h3>
      </div>
      {/* Card 3 */}
      <div className=" p-4 rounded-lg shadow-md text-center text-white min-w-[200px]">
        <h3 className="text-2xl ">Trusted by Professionals</h3>
      </div>
      <div className=" p-4 rounded-lg shadow-md text-center text-white min-w-[200px]">
        <h3 className="text-2xl ">The First To Use Erc1155 as collateral</h3>
      </div>
      <div className=" p-4 rounded-lg shadow-md text-center text-white min-w-[200px]">
        <h3 className="text-2xl ">Up-to-time Credit Verification</h3>
      </div>
      <div className=" p-4 rounded-lg shadow-md text-center text-white min-w-[200px]">
        <h3 className="text-2xl ">Trusted by Lending Protocols</h3>
      </div>  
    </div>
  </div>


{/* Sponsors Section */}
<div className="col-span-2 ">
  <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-6 text-center">
    SPONSORS
  </h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x--3  gap-y-4">
  {[
    { name: "Aave", img: "/sponsor/Aave.jpeg" },
    { name: "Arbitreum", img: "/sponsor/arbitreum.png" },
    { name: "Balancer", img: "/sponsor/balancer.png" },
    { name: "BlockScout", img: "/sponsor/blockscout.jpg" },
    { name: "Chainlink", img: "/sponsor/chainlink-link-logo.png" },
    { name: "Compound", img: "/sponsor/compound.png" },
    { name: "CurveDAO", img: "/sponsor/curvedao.png" },
    { name: "ENS", img: "/sponsor/ENS.jpeg" },
    { name: "ETH", img: "/sponsor/eth.webp" },
    { name: "Gitcoin", img: "/sponsor/gitcoin.png" },
    { name: "Gnosis", img: "/sponsor/gnosis.jpeg" },
    { name: "Kinto", img: "/sponsor/kinto.png" },
    { name: "MakerDAO", img: "/sponsor/Maker dao.png" },
    { name: "Mantle", img: "/sponsor/mantle.jpg" },
    { name: "Morph", img: "/sponsor/morph.jpeg" },
    { name: "Optimism", img: "/sponsor/optimism.png" },
    { name: "Polygon", img: "/sponsor/Polygon-300x300.jpeg" },
    { name: "Rootstock", img: "/sponsor/rootstock.jpeg" },
    { name: "Uniswap", img: "/sponsor/uniswap.png" },
    { name: "Yearn", img: "/sponsor/yearn.jpg" },
  ].map((sponsor, index) => (
    <div key={index} className="text-center">
      {/* Sponsor Image */}
      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
        <img
          src={sponsor.img}
          alt={sponsor.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Sponsor Name */}
      <h3 className="mt-1 text-xs text-white truncate">{sponsor.name}</h3>
    </div>
  ))}
</div>
{/* Teams Section */}
<div>
      <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-6 text-center mt-16">
        T E A M S
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8">
        {/* Profile 1 */}
        <div className="flex flex-col items-center">
          <img
            src="/profile/2.png"
            alt="Profile 1"
            className="w-24 h-24 rounded-full bg-gray-800 object-cover"
          />
          <div className="text-center mt-2">
            <p className="text-base font-semibold">Lee Shuen Rui</p>
            <p className="text-sm text-gray-400">Project Manager</p>
          </div>
        </div>

        {/* Profile 2 */}
        <div className="flex flex-col items-center">
          <img
            src="/profile/4.png"
            alt="Profile 2"
            className="w-24 h-24 rounded-full bg-gray-800 object-cover"
          />
          <div className="text-center mt-2">
            <p className="text-base font-semibold">Tan Aik Wei</p>
            <p className="text-sm text-gray-400">Backend Developer</p>
          </div>
        </div>

        {/* Profile 3 */}
        <div className="flex flex-col items-center">
          <img
            src="/profile/3.png"
            alt="Profile 3"
            className="w-24 h-24 rounded-full bg-gray-800 object-cover"
          />
          <div className="text-center mt-2">
            <p className="text-base font-semibold">Lai Cheong Kian</p>
            <p className="text-sm text-gray-400">UI/UX / Frontend</p>
          </div>
        </div>

        {/* Profile 4 */}
        <div className="flex flex-col items-center">
          <img
            src="/profile/1.png"
            alt="Profile 4"
            className="w-24 h-24 rounded-full bg-gray-800 object-cover"
          />
          <div className="text-center mt-2">
            <p className="text-base font-semibold">Lee Xin Rou</p>
            <p className="text-sm text-gray-400">Full Stack</p>
          </div>
        </div>

        {/* Profile 5 */}
        <div className="flex flex-col items-center">
          <img
            src="/profile/5.png"
            alt="Profile 5"
            className="w-24 h-24 rounded-full bg-gray-800 object-cover"
          />
          <div className="text-center mt-2">
            <p className="text-base font-semibold">Goh Wei Qi</p>
            <p className="text-sm text-gray-400">Frontend</p>
          </div>
        </div>
      </div>
    </div>




        </div>
      </div>
    </div>
  );
};

export default LandingPage;
