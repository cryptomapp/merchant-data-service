import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import ReputationRegistryABI from "./resources/ReputationRegistry.json";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { citizenAddress, referrerAddress } = req.body;

  try {
    // Interact with your smart contract here
    const result = await registerCitizen(citizenAddress, referrerAddress);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(422)
      .send(
        `Error registering citizen: ${error}, rpc_url: ${process.env.RPC_URL}, priv: ${process.env.PRIVATE_KEY}`
      );
  }
});

const registerCitizen = async (
  citizenAddress: string,
  referrerAddress: string
) => {
  // const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
  // const reputationRegistryContract = new ethers.Contract(
  //   "0x4D280BEBD203d9BbDaE2bBc4f0F25C64fB198613",
  //   ReputationRegistryABI.abi,
  //   wallet
  // );

  // Check if the citizen is already registered
  // const isRegistered =
  //   (await reputationRegistryContract.getEXP(citizenAddress)) > 0;

   // If citizen is already registered, return a message indicating so
  // if (isRegistered) {
  //   return { success: false, message: "Citizen is already registered" };
  // }

  // Check if the referrer address is valid before calling getEXP
  // let referrerEXP = 0;
  // if (
  //   ethers.isAddress(referrerAddress) &&
  //   referrerAddress !== ethers.ZeroAddress
  // ) {
  //   referrerEXP = await reputationRegistryContract.getEXP(referrerAddress);
  // }
  // const effectiveReferrerAddress =
  //   referrerEXP > 0 ? referrerAddress : ethers.ZeroAddress;

  // Register the citizen
  // const transaction = await reputationRegistryContract.registerCitizen(
  //   citizenAddress,
  //   effectiveReferrerAddress
  // );
  // await transaction.wait();

  return { success: true };
};

export default router;
