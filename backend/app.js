require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Use helmet to secure the app by setting HTTP headers
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Hardcoded MongoDB URI for testing
const MONGODB_URI = "mongodb+srv://jrussellmmii:b5lmCUuycTA0ZNb8@apds-cluster.xqu4gnm.mongodb.net/APDS7311_POE?retryWrites=true&w=majority";

// Debugging: Check if MongoDB URI is defined
console.log('MongoDB URI:', process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    console.log('MongoDB URI:', MONGODB_URI); // Debugging output

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if there is an error
  }
};

connectDB(); // Call the connection function

// Routes
app.use('/api/auth', authRoutes); // Use authRoutes for authentication-related endpoints

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