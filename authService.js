// backend/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (userData) => {
  const { username, password, fullName, accountNumber } = userData;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      accountNumber,
    });

    await newUser.save();
    return { message: 'User registered successfully', user: newUser };
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

const JWT_SECRET = "mytestsecret123"

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('No matching User found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = { registerUser, loginUser };