const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const apiKey = process.env.FINNHUB_API_KEY;
  const { symbol } = req.query;

  try {
    if (!symbol) {
      return res.status(400).json({ message: "Stock symbol is required." });
    }

    // Fetch recommendation data
    const recommendationResponse = await axios.get(
      `https://finnhub.io/api/v1/stock/recommendation`,
      {
        params: { symbol, token: apiKey },
      }
    );

    // Fetch stock candle data for the last 30 days
    const candleResponse = await axios.get(
      `https://finnhub.io/api/v1/stock/candle`,
      {
        params: {
          symbol,
          resolution: "D",
          from: Math.floor(Date.now() / 1000 - 86400 * 30),
          to: Math.floor(Date.now() / 1000),
          token: apiKey,
        },
      }
    );

    // Validate response data
    if (!recommendationResponse.data.length) {
      console.error(`No recommendation data found for symbol: ${symbol}`);
      return res.status(404).json({ message: "No recommendation data found." });
    }

    if (candleResponse.data.s !== "ok") {
      console.error(`No candle data found for symbol: ${symbol}`);
      return res.status(404).json({ message: "No candle data found." });
    }

    res.json({
      recommendation: recommendationResponse.data[0],
      candle: candleResponse.data,
    });
  } catch (error) {
    console.error("Backend Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Server Error",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
