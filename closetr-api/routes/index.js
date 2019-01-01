var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var result_json = {
    status: 'up',
    message: 'Welcome to the Closetr API!',
  }
  res.json(result_json);
});

module.exports = router;
