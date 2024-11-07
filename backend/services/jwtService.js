const jwt = require('jsonwebtoken');

// Verify JWT token
const verifyToken = (req, res, next) => {
<<<<<<< HEAD
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Bearer <token>'
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Store verified user info in req object
    next(); // Call the next middleware
  } catch (error) {
    console.error('Token verification error:', error); // Log the error
    res.status(401).json({ message: 'Invalid token.' }); // Change to 401 status
=======
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
>>>>>>> 468b49c (Register page is fixed)
  }
};

module.exports = verifyToken;
