const express = require("express");
const Account = require("../models/Account");
const User = require("../models/userModel"); // Adjust the path if needed
const Investment = require("../models/investmentModel"); 

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

router.post("/deduct-balance", authMiddleware, async (req, res) => {  // ✅ Added authMiddleware
    try {
      const { amount } = req.body;
      const userEmail = req.user.email; // ✅ Extract email from authMiddleware
  
      if (!userEmail) {
        return res.status(403).json({ message: "Unauthorized. Email is missing." });
      }
  
      let account = await Account.findOne({ email: userEmail });
  
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      if (account.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      account.balance -= amount;
      await account.save();
  
      res.json({ balance: account.balance, message: "Balance updated successfully" });
    } catch (error) {
      console.error("Error updating balance:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  router.post("/sell", authMiddleware, async (req, res) => {
    try {
      const { investmentId } = req.body;
      const userEmail = req.user.email;
  
      if (!userEmail) {
        return res.status(403).json({ message: "Unauthorized. Email is missing." });
      }
  
      // ✅ Find the investment
      const investment = await Investment.findOne({ _id: investmentId });
  
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
  
      // ✅ Fetch or create user's account
      let account = await Account.findOne({ email: userEmail });
      if (!account) {
        account = new Account({ email: userEmail, balance: 0 });
      }
  
      // ✅ Add investment amount back to the account balance
      account.balance += investment.amount;
      await account.save();
  
      // ✅ Delete the investment
      await Investment.deleteOne({ _id: investmentId });
  
      res.json({ message: "Investment sold successfully", balance: account.balance });
    } catch (error) {
      console.error("Error selling investment:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
  

  module.exports = router;