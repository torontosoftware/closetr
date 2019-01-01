const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const result_json = {
    status: 'success',
    message: 'Welcome to the Closetr API!',
  }
  res.json(result_json);
});

module.exports = router;
