const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require('./routes/authRoutes'); 
const investmentRoutes = require('./routes/investmentRoutes');
const stockRoutes = require("./routes/stockRoutes");  // Import investments route
const marketRoutes = require("./routes/marketRoutes");
const suggestionsRoute = require("./routes/suggestions");
const recommendationRoute = require("./routes/recommendation"); // Import investments route
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require("./routes/accountRoutes");
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api", marketRoutes);  // 👈 Now investments route is accessible
app.use("/api/suggestions", suggestionsRoute);
app.use("/api/recommendation", recommendationRoute);
app.use('/api', userRoutes);
app.use("/api/account", accountRoutes);// 👈 Now investments route is accessible

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
