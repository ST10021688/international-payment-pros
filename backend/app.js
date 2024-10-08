/*require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const connectToDatabase = require('./db/conn_db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Use helmet to secure the app by setting HTTP headers
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

connectToDatabase().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit the process with an error code
});

// Routes
app.use('/api/auth', authRoutes); // Use authRoutes for authentication-related endpoints
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
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
*/

require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
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

connectToDatabase().catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); // Exit the process with an error code
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