// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
  async signup(req, res) {
    try {
      const { email, password } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      // Create a JWT token for authentication
      const token = jwt.sign({ userId: newUser._id }, 'your-secret-key');

      res.status(201).json({ userId: newUser._id, token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if the password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token for authentication
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');

      res.status(200).json({ userId: user._id, token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default authController;
