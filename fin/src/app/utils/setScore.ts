import { readContract, createThirdwebClient, getContract, defineChain } from "thirdweb";

// Initialize the client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "532699bdaa165dbc79d1ab6f988ae3dd", // Replace with your actual client ID
});

// Define the Sepolia chain
const sepolia = defineChain(11155111);

// Connect to your contract
const contract = getContract({
  client,
  chain: sepolia,
  address: "0xF9C9441f78Bf83717B901E72e532465bd3B79e8D", // Replace with your contract address
});

// Modified fetchCreditScore function to safely convert bigint to number
export async function fetchCreditScore(userAddress: string): Promise<number> {
  try {
    const creditScore = await readContract({
      contract, // Contract instance
      method: "function getCreditScore(address user) view returns (uint256)", // Method with complete signature
      params: [userAddress], // Parameters
    });

    console.log(`Credit Score: ${creditScore}`);
    return Number(creditScore); // Safely convert bigint to number
  } catch (error) {
    console.error("Error fetching credit score:", error);
    throw error;
  }
}

export { contract };
