import express from "express";
import { isValidMerchantData, MerchantData } from "./MerchantData";
import bundlrService from "./bundlrService";
import { registerMerchant } from "./registrationService";

const router = express.Router();

router.post("/", async (req, res) => {
  const data: MerchantData = req.body;

  if (!isValidMerchantData(data)) {
    return res.status(400).send("Invalid merchant data.");
  }

  const bundlr = bundlrService.createBundlrInstance();

  try {
    const response = await bundlr.upload(JSON.stringify(data));
    const arweaveLink = `https://arweave.net/${response.id}`;

    // Call the register function after data is uploaded to Arweave
    await registerMerchant(data.merchantAddress, response.id);

    return res.json({ link: arweaveLink });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(`Upload error: ${error.message}`);
    }
    return res.status(500).send("An unknown error occurred.");
  }
});

export default router;
