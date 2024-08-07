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
      jwt.verify(token, "secret", (err, decodedToken) => {
        if (err) {
          res.status(400).json({ error: err })
        } else {
          res.status(200).json({ message: "Authentication OK" })
        }
      });
    } else {
      res.status(401).json({ message: "Unauthorized" })
    }
  });

module.exports = router;