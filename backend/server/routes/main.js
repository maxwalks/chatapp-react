const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const { requireAuth } = require('../../middleware/authMiddleware');
const authController = require('../../controllers/authController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { userValidationRules, validate } = require("../../middleware/validator")
const axios = require("axios")

router.post('/auth/register', authController.signup_post);
router.post('/auth/login', authController.login_post);

router.post('/authenticate', async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, "secret", async (err, decodedToken) => {
        if (err) {
          res.status(400).json({ error: err })
        } else {
          const user = await User.findById(decodedToken.id)
          if (user) {
            res.status(200).json({ message: "Authentication OK" })
          } else {
            res.status(401).json({ message: "Unauthorized" })
          }
        }
      });
    } else {
      res.status(401).json({ message: "Unauthorized" })
    }
});

router.post("/api/getPosts", async (req, res) => {
  const posts = await Post.find()
  res.status(200).json(posts)
})

router.post("/api/sendMessage", async (req, res) => {
  const headers = req.headers.authorization
  const { message } = req.body
  if (!message || message === "") {
    res.status(400).json({ message: "Empty message" })
  }
  if (headers) {
    jwt.verify(headers, "secret", async (err, decodedToken) => {
      const user = await User.findById(decodedToken.id)
      await Post.create({ message : message, author: user.username })
      const post = await Post.find()
      res.status(200).json(post)
    })
  } else {
    res.status(401).json({ message: "Unauthorized." })
  }
})

module.exports = router;