const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const sslOptions = {
  key: fs.readFileSync('path/to/private.key'),
  cert: fs.readFileSync('path/to/certificate.crt'),
};

// Start HTTPS server
const startSSLServer = () => {
  https.createServer(sslOptions, app).listen(443, () => {
    console.log('Secure server running on port 443');
  });
};

module.exports = startSSLServer;
