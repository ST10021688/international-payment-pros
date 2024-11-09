require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const csrfProtection = require('./middleware/csrfProtectionMiddleware');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const connectToDatabase = require('./db/conn_db');
const https = require('https'); // Include https module
const fs = require('fs'); // File system to read SSL certificates

const app = express();
const PORT = process.env.PORT || 5000;

// SSL Config: Load your SSL certificates
const sslOptions = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
  ca: fs.readFileSync('./keys/myCA.pem')
};

// Middleware
app.use(helmet()); // Use helmet to secure the app by setting HTTP headers
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Use cookie-parser for handling CSRF cookies
app.use(csrfProtection); // Use CSRF protection middleware

// Additional Helmet configurations for security
app.use(helmet.frameguard({ action: 'deny' })); // Clickjacking protection
app.use(helmet.xssFilter());                    // XSS protection
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "frame-ancestors": ["'self'"], // Restricts iframes to the same origin
      defaultSrc: ["'self'"],        // Restrict resources to the same origin
      scriptSrc: ["'self'"],         // Restrict JavaScript to the same origin
      objectSrc: ["'none'"],         // Blocks risky plugins or objects
    },
  })
);
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true })); // HSTS for HTTPS-only

// Connect to MongoDB
connectToDatabase().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit the process if there is an error
});

// Route to get CSRF token
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use('/api/auth', authRoutes); // Use authRoutes for authentication-related endpoints

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Secure server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
