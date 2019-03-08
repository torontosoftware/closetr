const express = require('express');
const router = express.Router();
const outfit_entries_controller = require('./outfit_entries.controller');

router.post('/entry', outfit_entries_controller.add_new_entry);
router.get('/entry', outfit_entries_controller.get_entry);
router.delete('/entry', outfit_entries_controller.delete_entry);

module.exports = router;
