// create server
const express = require("express");
const multer = require("multer"); // needed for error handling
const cookieParser = require("cookie-parser");
const cors = require("cors");

// route imports
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true, // allow cookies/auth headers
}));
app.use(cookieParser());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err); // log full error in backend console

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    error: err.message || "Internal server error",
  });
});

module.exports = app;
