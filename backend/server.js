const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes'); // Adjust the path as needed
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Database connection (make sure to adjust the connection string)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the auth routes
app.use('/api/auth', authRoutes); // This mounts the authRoutes on the /api/auth path

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});