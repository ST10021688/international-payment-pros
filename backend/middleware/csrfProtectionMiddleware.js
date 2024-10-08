const csurf = require('csurf');

// Setup CSRF protection middleware
const csrfProtection = csurf({
  cookie: true // Store the CSRF token in a cookie
});

module.exports = csrfProtection;