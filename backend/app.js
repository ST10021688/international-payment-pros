require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes'); 
const connectToDatabase = require('./db/conn_db');
const csrfProtection = require('./middleware/csrfProtectionMiddleware');

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(helmet()); // Use helmet to secure the app by setting HTTP headers
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Needed for CSRF cookie handling

const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Enable set cookie
};

app.use(cors(corsOptions)); // Apply the CORS configuration

// CSRF Protection middleware for all POST, PUT, DELETE routes
app.use(csrfProtection);

// Route to get the CSRF token for frontend
/*app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});*/

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() }); // Send the CSRF token in the response
});




// Auth routes
app.use('/api/auth', authRoutes); // Use authRoutes for authentication-related endpoints

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to the database
connectToDatabase().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit the process with an error code
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});