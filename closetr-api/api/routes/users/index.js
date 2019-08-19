const express = require('express');
const users_controller = require('./users.controller');

const router = express.Router();
router.post('/login', users_controller.check_login_credentials);
router.post('/update', users_controller.update_user_info);
router.post('/register', users_controller.register_new_user);

module.exports = router;
