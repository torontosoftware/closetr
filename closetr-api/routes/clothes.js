const express = require('express');
const router = express.Router();

// clothes schema
const clothes = require('../models/clothes.model');

/* API sets one new user clothing */
router.post('/clothing', function(req, res, next) {
  // gather attributes from request
  const newItem = {
    clothingName: req.body.clothing.clothingName,
    clothingCost: req.body.clothing.clothingCost,
    clothingCategory: req.body.clothing.clothingCategory,
    clothingWorn: req.body.clothing.clothingWorn
  };

  console.log('creating a new clothing item');

  // create new clothing from clothes schema
  clothes.create(newItem)
  .then(data => {
    const result_json = {
      status: 'success',
      data: data
    };
    res.json(result_json);
  })
   .catch(err => {
     const result_json = {
       status: 'failed',
       message: err.message
     };
     res.json(result_json);
   })
});

/* API returns all user clothes */
router.get('/all', function(req, res, next) {
  // query all clothes in the database
  clothes.find()
  .then(data => {
   const result_json = {
       status: 'success',
       data: data
     };
     res.json(result_json);
   })
   .catch(err => {
     const result_json = {
       status: 'failed',
       message: err.message
     };
     res.json(result_json);
   })
});


/* API appends one piece of clothing */

module.exports = router;
