var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
       status: 'up',
       message: 'This should return all users objects',
    });
});

module.exports = router;
