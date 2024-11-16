"use client";

import React, { useState } from "react";
import { getTransactionsByAddress } from "../../../api/getTransaction";
import { getTokenList } from "../../../api/getTokenList";
import { fetchNFTData } from "../../../api/getNFT";

export default function Test() {
  const [address, setAddress] = useState(""); // Centralized address state
  const [transactions, setTransactions] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleFetchData = async () => {
    if (!address) {
      alert("Please enter a valid Ethereum address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [transactionResult, tokenResult, nftResult] = await Promise.all([
        getTransactionsByAddress(address),
        getTokenList(address),
        fetchNFTData(address),
      ]);
      // Log the data to the console for debugging
      console.log("Transactions Data:", transactionResult);
      console.log("Tokens Data:", tokenResult);
      console.log("NFT Data:", nftResult);

      // Set the results to the state
      setTransactions(transactionResult);
      setTokens(tokenResult);
      setNfts(nftResult.items); // Accessing the items array
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const formatImageUrl = (imageUrl) => {
    if (imageUrl.startsWith('ipfs://')) {
      // Replace 'ipfs://' with 'https://gateway.pinata.cloud/ipfs/'
      return imageUrl.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
    }
    return imageUrl; // Return the original URL if it doesn't start with 'ipfs://'
  };
  

  return ( 
    <div className="mt-40 p-10 z-10">
      <h1 className="text-xl font-bold mb-4 text-white">
        Fetch Ethereum Data
      </h1>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter Ethereum address"
          value={address} // Centralized address state
          onChange={(e) => setAddress(e.target.value)} // Update centralized state
          className="w-min-30 w-80 mb-4 p-2 border text-black rounded z-index z-10"
        />
        <button
          onClick={handleFetchData}
          className="bg-blue-500 text-white py-2 px-4 rounded w-min-10 w-30 ml-2 h-10 z-index z-10"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>
  
      {error && <p className="text-red-500 mt-4">{error}</p>}
  
      <div>
        <h2>Owned NFTs:</h2>
        {Array.isArray(nfts) && nfts.length > 0 ? (
          <ul>
            {nfts.map((nft, index) => {
              const formattedImageUrl = formatImageUrl(nft.metadata?.image || nft.image_url);

              return (
                <li key={index}>
                  <strong>{nft.metadata?.name}</strong> - Token ID: {nft.id}
                  <br />
                  <img
                    src={formattedImageUrl}
                    alt={nft.metadata?.name || "NFT Image"}
                    style={{ width: "100px" }}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No NFTs found for the given address or an error occurred.</p>
        )}
      </div>
  
      {/* Tokens Section */}
      {tokens && (
        <div className="mt-10 z-10">
          <h2 className="text-lg font-semibold mb-2">Owned Tokens:</h2>
          {tokens.length > 0 ? (
            <ul>
              {tokens.map((token, index) => (
                <li key={index}>
                  <strong>{token.name}</strong> ({token.symbol}) - Balance:{" "}
                  {token.balance}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tokens found for the given address.</p>
          )}
        </div>
      )}
  
      {/* Transactions Section */}
      {transactions && (
        <div className="mt-6 z-10">
          <h2 className="text-lg font-semibold mb-2">Transactions:</h2>
          {transactions.length > 0 ? (
            <ul className="space-y-4">
              {transactions.map((tx, index) => (
                <li key={index} className="p-4 border rounded bg-gray-50">
                  <div className="gap-4 text-black">
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
                    <p>
                      <strong>Block Number:</strong> {tx.blockNumber}
                    </p>
                    <p>
                      <strong>Timestamp:</strong>{" "}
                      {new Date(tx.timeStamp * 1000).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions found for the given address.</p>
          )}
        </div>
      )}
    </div>
  );
}
