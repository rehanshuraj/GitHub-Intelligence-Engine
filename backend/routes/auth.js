/**
 * Handles GitHub OAuth login
 * Flow:
 * 1. Redirect user to GitHub authorization page
 * 2. Receive OAuth code from GitHub
 * 3. Exchange code for access token
 * 4. Store token inside a signed JWT
 */

import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * Step 1:
 * Redirect user to GitHub OAuth consent screen
 */
router.get("/github", (req, res) => {
  const redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo`;
  res.redirect(redirectURL);
});

/**
 * Step 2:
 * GitHub redirects back with `code`
 * We exchange code → access token
 */
router.get("/github/callback", async (req, res) => {
  const { code } = req.query;

  const tokenResponse = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },
    { headers: { Accept: "application/json" } }
  );

  // GitHub personal access token
  const accessToken = tokenResponse.data.access_token;

  /**
   * Store access token inside JWT
   * This avoids exposing GitHub token to frontend
   */
  const jwtToken = jwt.sign(
    { accessToken },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Redirect to frontend with JWT
  res.redirect(`http://localhost:5173/dashboard?token=${jwtToken}`);

});

export default router;
