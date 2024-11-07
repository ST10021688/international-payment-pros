const express = require('express');
<<<<<<< HEAD
const connectToDatabase = require('./db/conn_db');
=======
const mongoose = require('mongoose');
>>>>>>> 468b49c (Register page is fixed)
const authRoutes = require('./authRoutes'); // Adjust the path as needed
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

<<<<<<< HEAD
connectToDatabase().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit the process with an error code
=======
// Database connection (make sure to adjust the connection string)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
>>>>>>> 468b49c (Register page is fixed)
});

// Use the auth routes
app.use('/api/auth', authRoutes); // This mounts the authRoutes on the /api/auth path

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});