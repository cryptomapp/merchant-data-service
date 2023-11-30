import { ethers } from "ethers";

const RPC_URL = process.env.RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const MERCHANT_REGISTRY_ADDRESS = "0x4D280BEBD203d9BbDaE2bBc4f0F25C64fB198613";
const pathToABI =
  "../contractsArtifacts/MerchantRegistry.sol/MerchantRegistry.json";
const merchantRegistryArtifact = require(pathToABI);
const MERCHANT_REGISTRY_ABI = merchantRegistryArtifact.abi;

export const registerMerchant = async (
  merchantAddress: string,
  arweaveID: string
) => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const contract = new ethers.Contract(
    MERCHANT_REGISTRY_ADDRESS,
    MERCHANT_REGISTRY_ABI,
    wallet
  );

  try {
    console.log("Calling register function...");
    const tx = await contract.register(merchantAddress, arweaveID);
    await tx.wait(); // Wait for transaction to be mined
  } catch (err) {
    console.error("Error calling register function:", err);
    throw err;
  }
};
