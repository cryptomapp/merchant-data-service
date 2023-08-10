import express from "express";
import bundlrService from "./bundlrService";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const bundlr = bundlrService.createBundlrInstance();

    const amountToFund = 0.1;
    const fundAmountAtomic = bundlr.utils.toAtomic(amountToFund);

    // It's assumed that the fund() method would either resolve successfully or throw an error.
    await bundlr.fund(fundAmountAtomic);

    return res.status(200).json({ message: "Successfully funded!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(`Funding error: ${error.message}`);
    }
    return res.status(500).send("An unknown error occurred.");
  }
});

export default router;
