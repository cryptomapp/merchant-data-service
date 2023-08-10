import express from "express";
import dotenv from "dotenv";
import uploadController from "./uploadController";
import fundController from "./fundController";

dotenv.config();

const app = express();
const PORT = 3000;

// Use Express's built-in JSON parser
app.use(express.json());

// Mount the controllers
app.use("/upload", uploadController);
app.use("/fund", fundController);

// Simple health check endpoint (optional but good to have)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
