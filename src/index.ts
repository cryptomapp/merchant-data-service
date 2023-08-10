import express from "express";
import Bundlr from "@bundlr-network/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const MATIC_MUMBAI_PRIVATE_KEY = process.env.ARBITRUM_PRIVATE_KEY || "";

// Use Express's built-in JSON parser
app.use(express.json());

app.post("/upload", async (req, res) => {
  const { body } = req.body;

  if (!body) {
    return res.status(400).send("Missing data.");
  }

  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "matic",
    MATIC_MUMBAI_PRIVATE_KEY,
    {
      providerUrl: "https://rpc-mumbai.maticvigil.com",
    }
  );

  // Fund 0.2 MATIC
  const amountToFund = 0.1;
  // Convert to atomic units
  const fundAmountAtomic = bundlr.utils.toAtomic(amountToFund);

  const response = await bundlr.fund(fundAmountAtomic);

  // Upload data to Bundlr
  try {
    const response = await bundlr.upload(JSON.stringify(body));
    const arweaveLink = `https://arweave.net/${response.id}`;
    return res.json({ link: arweaveLink });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(`Upload error: ${error.message}`);
    }
    return res.status(500).send("An unknown error occurred.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
