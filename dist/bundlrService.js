"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("@bundlr-network/client"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MATIC_MUMBAI_PRIVATE_KEY = process.env.MATIC_MUMBAI_PRIVATE_KEY || "";
const createBundlrInstance = () => {
    return new client_1.default("https://devnet.bundlr.network", "matic", MATIC_MUMBAI_PRIVATE_KEY, {
        providerUrl: "https://rpc-mumbai.maticvigil.com",
    });
};
exports.default = {
    createBundlrInstance,
};
