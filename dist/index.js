"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const uploadController_1 = __importDefault(require("./uploadController"));
const fundController_1 = __importDefault(require("./fundController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
// Use Express's built-in JSON parser
app.use(express_1.default.json());
// Mount the controllers
app.use("/upload", uploadController_1.default);
app.use("/fund", fundController_1.default);
// Simple health check endpoint (optional but good to have)
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
