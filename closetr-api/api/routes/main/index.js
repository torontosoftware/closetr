const express = require('express');
const homePage = require('./homePage');

const router = express.Router();
router.get('/', homePage);

module.exports = router;
