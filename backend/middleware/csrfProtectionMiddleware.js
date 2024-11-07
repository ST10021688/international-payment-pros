<<<<<<< HEAD
const csurf = require('csurf');

// Setup CSRF protection middleware with secure cookie settings
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,         // Prevents JavaScript access to the CSRF cookie
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'Strict',     // Controls cross-site requests; 'Lax' is also a valid option
    maxAge: 60 * 60 * 1000  // Optional: Set cookie expiration time (1 hour here)
  }
});
=======
const csrf = require('csurf');

// Initialize CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
>>>>>>> 468b49c (Register page is fixed)

module.exports = csrfProtection;