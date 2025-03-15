const express = require("express");
const axios = require("axios");
require("dotenv").config();
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const STOCK_API_URL = "https://api.twelvedata.com/time_series";
const API_KEY = process.env.STOCK_API_KEY; // API key from .env

// Fetch stock data based on symbol
router.get("/:symbol",authMiddleware, async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get(STOCK_API_URL, {
      params: {
        symbol,
        interval: "5min",
        apikey: API_KEY,
      },
    });

    if (response.data.values) {
      return res.json(response.data);
    } else {
      return res.status(404).json({ error: "Stock data not found" });
    }
  } catch (error) {
    console.error(" Error fetching stock data:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
