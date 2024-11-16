export const fetchNFTData = async (address) => {
    const url = `https://eth.blockscout.com/api/v2/addresses/${address}/nft?type=ERC-721%2CERC-404%2CERC-1155`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error fetching NFT data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Returns the NFT data as a JSON object
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      throw error; // Propagate error
    }
  };