const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes'); 
const investmentRoutes = require('./routes/investmentRoutes'); // Import investments route

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);  // 👈 Now investments route is accessible

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
