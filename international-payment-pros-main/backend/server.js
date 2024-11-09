require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./authRoutes'); // Adjust the path if necessary

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Database connection
const connectDB = async () => {
  try {
    // Use the MongoDB URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process if there is an error
  }
};

// Call the connectDB function to establish the database connection
connectDB();

// Use the auth routes
app.use('/api/auth', authRoutes); // Mount auth routes under /api/auth

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
