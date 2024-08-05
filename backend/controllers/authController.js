const jwt = require('jsonwebtoken');
const User = require('../server/models/user');

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  });
};

exports.signup_post = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const lastip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    await User.create({ username, password, lastip });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

exports.login_post = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    next(error);
  }
};

exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'User logged out successfully' });
};
