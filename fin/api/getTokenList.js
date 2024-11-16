//getTokenList.js
export async function getTokenList(address) {
    const apiKey = process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY; // Optional, depending on your API setup
    const baseUrl = "https://eth-sepolia.blockscout.com/api";
    const url = `${baseUrl}?module=account&action=tokenlist&address=${address}${apiKey ? `&apikey=${apiKey}` : ""}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "1") {
            return data.result; // List of tokens
        } else {
            throw new Error(data.message || "Failed to fetch token list");
        }
    } catch (error) {
        console.error("Error fetching token list:", error);
        return null;
    }
}