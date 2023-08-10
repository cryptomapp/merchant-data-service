"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("@bundlr-network/client"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
const ARBITRUM_PRIVATE_KEY = process.env.ARBITRUM_PRIVATE_KEY || "";
// Use Express's built-in JSON parser
app.use(express_1.default.json());
app.post("/upload", async (req, res) => {
    const { body } = req.body;
    if (!body) {
        return res.status(400).send("Missing data.");
    }
    const bundlr = new client_1.default("https://devnet.bundlr.network", "arbitrum", ARBITRUM_PRIVATE_KEY);
    // Upload data to Bundlr
    try {
        const response = await bundlr.upload(JSON.stringify(body));
        const arweaveLink = `https://arweave.net/${response.id}`;
        return res.json({ link: arweaveLink });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send(`Upload error: ${error.message}`);
        }
        return res.status(500).send("An unknown error occurred.");
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
