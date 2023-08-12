"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bundlrService_1 = __importDefault(require("./bundlrService"));
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    try {
        const bundlr = bundlrService_1.default.createBundlrInstance();
        const amountToFund = 0.1;
        const fundAmountAtomic = bundlr.utils.toAtomic(amountToFund);
        // It's assumed that the fund() method would either resolve successfully or throw an error.
        await bundlr.fund(fundAmountAtomic);
        return res.status(200).json({ message: "Successfully funded!" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send(`Funding error: ${error.message}`);
        }
        return res.status(500).send("An unknown error occurred.");
    }
});
exports.default = router;
