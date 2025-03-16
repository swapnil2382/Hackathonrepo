const express = require('express');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get User Details (Authenticated Route)
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('name email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

module.exports = router;
