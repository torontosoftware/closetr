const express = require('express');
const router = express.Router();
const clothes_controller = require('./clothes.controller');

/* API sets one new user clothing */
router.post('/clothing', clothes_controller.add_new_clothing);
/* API deletes one clothing item by id. */
router.delete('/clothing/:clothing_id', clothes_controller.delete_clothing);
/* API returns all user clothes */
router.get('/all', clothes_controller.get_all_user_clothing);

module.exports = router;
