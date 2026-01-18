import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import { analyzeUser } from "./controllers/analyze.controller.js";

dotenv.config();

const app = express();

/**
 * ✅ CORS FIX (CRITICAL)
 * - Allow Authorization header
 * - Allow frontend origin
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// OAuth routes
app.use("/auth", authRoutes);

// Analyze route
app.get(
  "/analyze/:username",
  (req, res, next) => {
    console.log("Analyze route hit for:", req.params.username);
    next();
  },
  analyzeUser
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
