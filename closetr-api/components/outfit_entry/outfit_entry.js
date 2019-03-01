const express = require('express');
const router = express.Router();
const outfit_entry_controller = require('./outfit_entry.controller');

router.post('/entry', outfit_entry_controller.add_new_entry);

module.exports = router;