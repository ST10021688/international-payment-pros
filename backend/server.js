const express = require('express');
const connectToDatabase = require('./db/conn_db');
const authRoutes = require('./authRoutes'); // Adjust the path as needed
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

connectToDatabase().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit the process with an error code
});

// Use the auth routes
app.use('/api/auth', authRoutes); // This mounts the authRoutes on the /api/auth path

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});