import { ethers } from "ethers";

const BUILDBEAR_NETWORK =
  "https://rpc.buildbear.io/vivacious-shaak-ti-0a200963";
const PRIVATE_KEY = process.env.BUILDBEAR_PRIVATE_KEY || "";
const MERCHANT_REGISTRY_ADDRESS = "0xF16F5673fb6C003B0F0e41028a026170576Cb380";
const pathToABI =
  "../../cryptom-protocol/artifacts/contracts/MerchantRegistry.sol/MerchantRegistry.json";
const merchantRegistryArtifact = require(pathToABI);
const MERCHANT_REGISTRY_ABI = merchantRegistryArtifact.abi;

export const registerMerchant = async (
  merchantAddress: string,
  arweaveID: string
) => {
  const provider = new ethers.JsonRpcProvider(BUILDBEAR_NETWORK);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const contract = new ethers.Contract(
    MERCHANT_REGISTRY_ADDRESS,
    MERCHANT_REGISTRY_ABI,
    wallet
  );

  try {
    const tx = await contract.register(merchantAddress, arweaveID);
    await tx.wait(); // Wait for transaction to be mined
  } catch (err) {
    console.error("Error calling register function:", err);
    throw err;
  }
};
