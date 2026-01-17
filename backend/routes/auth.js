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

  const accessToken = tokenResponse.data.access_token;

  const jwtToken = jwt.sign(
    { accessToken },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // ✅ Production-safe redirect
  res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${jwtToken}`);
});
