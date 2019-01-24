const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// clothes schema
const clothes = require('../models/clothes.model');

/* API sets one new user clothing */
router.post('/clothing', function(req, res, next) {
  // gather attributes from request
  var clothing = req.body.clothing;
  const newItem = {
    clothingName: clothing.clothingName,
    clothingCost: clothing.clothingCost,
    clothingCategory: clothing.clothingCategory,
    clothingWorn: clothing.clothingWorn
  };

  if (clothing.clothingID == null) {
    newItem['_id'] = mongoose.Types.ObjectId();
  } else {
    newItem['_id'] = clothing.clothingID;
  }

  // create new clothing from clothes schema
  clothes.findOneAndUpdate(
    {_id: newItem._id},
    newItem,
    {upsert: true, new: true, runValidators: true},
    function (err, doc) {
      if (err) {
        const result_json = {
          status: 'failed',
          message: err.message
        };
        res.json(result_json);
      } else {
        const result_json = {
          status: 'success',
          data: doc
        };
        res.json(result_json);
      }
    }
  );
});


/* API returns all user clothes */
router.get('/all', function(req, res, next) {
  // query all clothes in the database
  clothes.find(
    {},
    function (err, doc) {
      if (err) {
        const result_json = {
          status: 'failed',
          message: err.message
        };
        res.json(result_json);
      } else {
        var result = [];
        doc.forEach(function(clothing) {
          var clothingResult = {
            clothingID: clothing._id,
            clothingName: clothing.clothingName,
            clothingCategory: clothing.clothingCategory,
            clothingWorn: clothing.clothingWorn,
            clothingCost: clothing.clothingCost
          }
          result.push(clothingResult);
        });
        const result_json = {
          status: 'success',
          data: result
        };
        res.json(result_json);
      }
    }
  );
});

/* API deletes one clothing item by id. */
router.delete('/clothing/:clothing_id', function(req, res, next) {
  // gather attributes from request
  var clothingID = req.params.clothing_id;
  // create new clothing from clothes schema
  clothes.remove(
    {_id: clothingID},
    function (err, doc) {
      if (err) {
        const result_json = {
          status: 'failed',
          message: err.message,
        };
        res.json(result_json);
      } else {
        const result_json = {
          status: 'success',
          data: doc
        };
        res.json(result_json);
      }
    }
  );
});

module.exports = router;
