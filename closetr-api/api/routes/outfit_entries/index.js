const express = require('express');
const outfit_entries_controller = require('./outfit_entries.controller');

const router = express.Router();
router.post('/entry', outfit_entries_controller.add_new_entry);
router.get('/entry', outfit_entries_controller.get_entry);
router.delete('/entry/:id', outfit_entries_controller.delete_entry);

module.exports = router;
