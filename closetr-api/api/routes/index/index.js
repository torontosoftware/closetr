const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', home_page);

function home_page (req, res, next) {
  const result_json = {
    status: 200,
    message: 'Welcome to the Closetr API!',
  }
  res.json(result_json);
}

module.exports = router;
