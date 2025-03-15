const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Investment', investmentSchema);
