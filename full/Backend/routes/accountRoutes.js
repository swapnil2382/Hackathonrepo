const express = require("express");
const Account = require("../models/Account");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Fix: Fetch account balance using email
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email; // Extract email from token

    if (!userEmail) {
      return res.status(403).json({ message: "Unauthorized. Email is missing." });
    }

    let account = await Account.findOne({ email: userEmail });

    if (!account) {
      return res.json({ balance: 0 }); // Return 0 if account doesn't exist
    }

    res.json({ balance: account.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Fix: Add money using email
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const userEmail = req.user.email; // Extract email from token

    if (!userEmail) {
      return res.status(403).json({ message: "Unauthorized. Email is missing." });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount." });
    }

    let account = await Account.findOne({ email: userEmail });

    if (!account) {
      account = new Account({ email: userEmail, balance: 0 }); // Create new account
    }

    account.balance += amount;
    await account.save();

    res.json({ message: "Money added successfully", balance: account.balance });
  } catch (error) {
    console.error("Error adding money:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/deduct-balance", async (req, res) => {
    const { amount } = req.body;
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (user.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      user.balance -= amount;
      await user.save();
  
      res.json({ balance: user.balance, message: "Balance updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating balance" });
    }
  });
  
  module.exports = router;
