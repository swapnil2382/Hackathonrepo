const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const API_KEY = process.env.STOCK_API_KEY;
const BASE_URL = "https://api.twelvedata.com";

// Generic function to fetch market data
const fetchData = async (endpoint, symbol) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        symbol,
        interval: "5min",
        apikey: API_KEY,
      },
    });

    if (response.data.values) {
      return response.data;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching market data");
  }
};

// Stock Data Route
router.get("/stocks/:symbol", async (req, res) => {
  try {
    const data = await fetchData("time_series", req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Indices Data Route
router.get("/indices/:symbol", async (req, res) => {
  try {
    const data = await fetchData("indices", req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Forex Data Route
router.get("/forex/:symbol", async (req, res) => {
  try {
    const data = await fetchData("forex_pairs", req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Crypto Data Route
router.get("/crypto/:symbol", async (req, res) => {
  try {
    const data = await fetchData("cryptocurrencies", req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// ETFs Data Route
router.get("/etfs/:symbol", async (req, res) => {
  try {
    const data = await fetchData("etf", req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
