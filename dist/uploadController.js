"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MerchantData_1 = require("./MerchantData");
const bundlrService_1 = __importDefault(require("./bundlrService"));
const registrationService_1 = require("./registrationService");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const data = req.body;
    data.latitude = +data.latitude;
    data.longitude = +data.longitude;
    if (!(0, MerchantData_1.isValidMerchantData)(data)) {
        return res.status(400).send("Invalid merchant data.");
    }
    const bundlr = bundlrService_1.default.createBundlrInstance();
    try {
        const response = await bundlr.upload(JSON.stringify(data));
        const arweaveLink = `https://arweave.net/${response.id}`;
        // Call the register function after data is uploaded to Arweave
        console.log("Registering merchant...");
        await (0, registrationService_1.registerMerchant)(data.merchantAddress, response.id);
        return res.json({ link: arweaveLink });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send(`Upload error: ${error.message}`);
        }
        return res.status(500).send("An unknown error occurred.");
    }
});
exports.default = router;
