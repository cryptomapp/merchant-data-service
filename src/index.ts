import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadController from "./uploadController";
import fundController from "./fundController";
import citizenController from "./citizenController";

dotenv.config();

const app = express();
const PORT = 3000;

// Use Express's built-in JSON parser
app.use(express.json());

// Use CORS
app.use(cors());

app.use(
  cors({
    origin: ["https://cryptomapp.vercel.app", "http://localhost:9000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Mount the controllers
app.use("/upload", uploadController);
app.use("/fund", fundController);
app.use("/citizen", citizenController);

// Simple health check endpoint (optional but good to have)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
