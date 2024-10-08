const crypto = require('crypto');

// Encrypt sensitive data
const encrypt = (data) => {
  const cipher = crypto.createCipher('aes-256-ctr', process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Decrypt sensitive data
const decrypt = (data) => {
  const decipher = crypto.createDecipher('aes-256-ctr', process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt };
