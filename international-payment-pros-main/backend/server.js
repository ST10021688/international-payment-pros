const express = require('express');
const connectToDatabase = require('./db/conn_db'); // Connects to MongoDB
const authRoutes = require('./authRoutes'); // Adjust path if necessary
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Connect to the database
connectToDatabase().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit the process if there is an error
});

// Use the auth routes
app.use('/api/auth', authRoutes); // Mount the authRoutes on the /api/auth path

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
