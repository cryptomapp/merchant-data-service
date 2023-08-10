import Bundlr from "@bundlr-network/client";
import dotenv from "dotenv";

dotenv.config();

const MATIC_MUMBAI_PRIVATE_KEY = process.env.MATIC_MUMBAI_PRIVATE_KEY || "";

const createBundlrInstance = () => {
  return new Bundlr(
    "https://devnet.bundlr.network",
    "matic",
    MATIC_MUMBAI_PRIVATE_KEY,
    {
      providerUrl: "https://rpc-mumbai.maticvigil.com",
    }
  );
};

export default {
  createBundlrInstance,
};
