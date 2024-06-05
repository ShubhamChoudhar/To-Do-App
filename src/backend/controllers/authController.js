const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (userId) => {
  // Generate a JWT token with userId payload
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' }); // Assuming you have defined SECRET_KEY

  return token;
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword});
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User email not found');
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.error('Password comparison failed:', { email, password });
      return res.status(400).send('Password is incorrect');
    }

    // Generate and return JWT token
    const token = generateToken(user._id);
    res.json({ token, user });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
};

module.exports = { register, login };