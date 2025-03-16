const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const apiKey = process.env.FINNHUB_API_KEY;
  const { exchange = "US" } = req.query;

  try {
    const response = await axios.get(`https://finnhub.io/api/v1/stock/symbol`, {
      params: { exchange, token: apiKey },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Finnhub:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
