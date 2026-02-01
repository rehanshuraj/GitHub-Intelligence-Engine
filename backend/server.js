import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import { analyzeUser } from "./controllers/analyze.controller.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

// OAuth routes
app.use("/auth", authRoutes);

// Analysis route
app.get("/analyze/:username", analyzeUser);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`hello rajveer your server is running on port ${PORT}`);
});
