const express = require('express');
const Investment = require('../models/investmentModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { name, amount } = req.body;
  const newInvestment = new Investment({ userId: req.userId, name, amount });
  await newInvestment.save();
  res.status(201).json(newInvestment);
});

router.get('/', authMiddleware, async (req, res) => {
  const investments = await Investment.find({ userId: req.userId });
  res.json(investments);
});

router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.params.userId });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching investments", error });
  }
});


module.exports = router;
