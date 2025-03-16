const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model("Account", accountSchema);
