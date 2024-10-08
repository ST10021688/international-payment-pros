const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;
      console.log("Authorization Header:", authHeader);  // Log auth header

      if (!authHeader) {
          return res.status(401).json({ message: "Authorization header missing" });
      }

      const token = authHeader.split(" ")[1];
      console.log("Extracted Token:", token);  // Log token

      if (!token) {
          return res.status(401).json({ message: "Token missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);  // Log decoded token content
      
      req.user = decoded;  // Attach decoded token (which should have user id and username)
      next(); 
  } catch (error) {
      console.error("JWT verification error:", error.message);
      res.status(401).json({
          message: "Token invalid or expired",
          error: error.message, 
      });
  }
};

module.exports = checkAuth;