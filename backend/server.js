/**
 * Entry point of backend server
 * - Loads environment variables
 * - Starts Express server
 * - Registers routes
 */

import express from "express";
import dotenv, { config } from "dotenv";
import authRoutes from "./routes/auth.js"

import { analyzeUser } from "./controllers/analyze.controller.js";

dotenv.config();

const app=express();
app.use(express.json());

// GitHub OAuth routes
app.use("/auth", authRoutes);

// Analyze GitHub user engineering behavior
app.get("/analyze/:username", analyzeUser);


const PORT=3000;
app.listen(PORT, ()=>{
    console.log("hello rajveer your server is running")
})