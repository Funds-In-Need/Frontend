//getTransaction.js
export async function getTransactionsByAddress(
    address,
    startBlock = 1,
    endBlock = 99999999,
    page = 1,
    offset = 200,
    sort = "asc"
  ) {
    const baseUrl = "https://eth-sepolia.blockscout.com/api";
    const apiKey = process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY; 
    const url = `${baseUrl}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}${
      apiKey ? `&apikey=${apiKey}` : ""
    }`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "1") {
        return data.result; // List of transactions
      } else {
        throw new Error(data.message || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return null;
    }
  }