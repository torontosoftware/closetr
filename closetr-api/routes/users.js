const express = require('express');
const router = express.Router();

// clothes schema
const clothes = require('../models/clothes');

/* GET users listing. */
router.get('/', function(req, res, next) {

  // query all clothes in the database
  clothes.find()
  .then(clothes => {
    // if success, create response json
    const result_json = {
      status: 'success',
      data: clothes
    }
    // send response json
    res.json(result_json)
  })
  .catch(err => {
    // if fail, create response json
    const result_json = {
      status: 'failed',
      message: err.message
    }
    // send response json
  })
});

module.exports = router;
