const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Registrierung
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: 'E-Mail, Benutzername und Passwort sind erforderlich' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Passwort muss mindestens 6 Zeichen lang sein' });
  }

  const existingEmail = await User.findOne({ email: email.toLowerCase() });
  if (existingEmail) {
    return res.status(400).json({ message: 'E-Mail bereits registriert' });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: 'Benutzername bereits vergeben' });
  }

  const user = await User.create({ email, password, username });

  const token = generateToken(user._id);

  res.status(201).json({
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    token,
  });
});

// Login (weiterhin mit E-Mail)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(400).json({ message: 'Ungültige E-Mail oder Passwort' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Ungültige E-Mail oder Passwort' });
  }

  const token = generateToken(user._id);

  res.json({
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    token,
  });
});

module.exports = router;
