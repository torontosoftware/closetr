var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//get closet api
router.get('/api/gc', function(req, res, next) {
  res.send('hi there!');
});

module.exports = router;
