import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import { analyzeUser } from "./controllers/analyze.controller.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  // "https://git-hub-intelligence-engine-hbrn.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);;

app.use(express.json());

// OAuth routes
app.use("/auth", authRoutes);

// Analysis route
app.get("/analyze/:username", analyzeUser);
app.get("/", (req, res) => {
  res.send("Hello rajveer! The server is up and running.");
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`hello rajveer your server is running on port ${PORT}`);
});
