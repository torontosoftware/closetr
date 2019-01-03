const express = require('express');
const router = express.Router();

// clothes schema
const clothes = require('../models/clothes.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // query all clothes in the database
  clothes.find()
  .then(clothes => {
   const result_json = {
       status: 'success',
       data: clothes
     }
     res.json(result_json)
   })
   .catch(err => {
     const result_json = {
       status: 'failed',
       message: err.message
     }
   })
});

module.exports = router;
