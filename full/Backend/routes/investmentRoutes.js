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

module.exports = router;
