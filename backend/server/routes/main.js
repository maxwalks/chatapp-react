const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const { requireAuth } = require('../../middleware/authMiddleware');
const authController = require('../../controllers/authController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { userValidationRules, validate } = require("../../middleware/validator")

router.post('/auth/register', userValidationRules(), validate, authController.signup_post);
router.post('/auth/login', authController.login_post);

module.exports = router;