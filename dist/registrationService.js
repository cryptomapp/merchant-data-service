"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMerchant = void 0;
const ethers_1 = require("ethers");
const BUILDBEAR_NETWORK = "https://rpc.buildbear.io/past-raymus-antilles-a33a62e5";
const PRIVATE_KEY = process.env.BUILDBEAR_PRIVATE_KEY || "";
const MERCHANT_REGISTRY_ADDRESS = "0xC1F77354a9cAF1CC72E963A5EcFe1B782bDdDd47";
const pathToABI = "../../cryptom-protocol/artifacts/contracts/MerchantRegistry.sol/MerchantRegistry.json";
const merchantRegistryArtifact = require(pathToABI);
const MERCHANT_REGISTRY_ABI = merchantRegistryArtifact.abi;
const registerMerchant = async (merchantAddress, arweaveID) => {
    const provider = new ethers_1.ethers.JsonRpcProvider(BUILDBEAR_NETWORK);
    const wallet = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers_1.ethers.Contract(MERCHANT_REGISTRY_ADDRESS, MERCHANT_REGISTRY_ABI, wallet);
    try {
        console.log("Calling register function...");
        const tx = await contract.register(merchantAddress, arweaveID);
        await tx.wait(); // Wait for transaction to be mined
    }
    catch (err) {
        console.error("Error calling register function:", err);
        throw err;
    }
};
exports.registerMerchant = registerMerchant;
