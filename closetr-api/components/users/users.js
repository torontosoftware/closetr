const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('./users.model');

const users_controller = require('./users.controller');

router.post('/login', users_controller.check_login_credentials);
router.post('/update', users_controller.update_user_info);
router.post('/register', users_controller.register_new_user);

module.exports = router;
