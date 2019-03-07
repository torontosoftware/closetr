const express = require('express');
const mongoose = require('mongoose');
const clothes_model = require('./clothes.model');

function add_new_clothing(req, res, next) {
  // gather attributes from request
  const clothing = req.body.clothing;
  const newItem = {
    clothingName: clothing.clothingName,
    clothingCost: clothing.clothingCost,
    clothingCategory: clothing.clothingCategory,
    clothingWorn: clothing.clothingWorn,
    clothingPurchaseDate: clothing.clothingPurchaseDate,
    userID: clothing.userID
  };

  if (clothing.clothingID == null) {
    newItem['_id'] = mongoose.Types.ObjectId();
  } else {
    newItem['_id'] = clothing.clothingID;
  }

  // create new clothing from clothes schema
  clothes_model.findOneAndUpdate(
    {_id: newItem._id},
    newItem,
    {upsert: true, new: true, runValidators: true},
    (err, doc) => generic_error_handling(err, doc, res)
  );
}

function delete_clothing(req, res, next) {
  // gather attributes from request
  const clothingID = req.params.clothing_id;
  // create new clothing from clothes schema
  clothes_model.remove(
    {_id: clothingID},
    (err, doc) => generic_error_handling(err, doc, res)
  );
}

function get_all_user_clothing(req, res, next) {
  // query all clothes in the database
  const userID = req.query.userID;
  clothes_model.find(
    {userID: userID},
    (err, doc) => get_all_clothing_error_handling(err, doc, res)
  );
}

function get_all_clothing_error_handling(err, doc, res) {
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
        clothingCost: clothing.clothingCost,
        clothingPurchaseDate: clothing.clothingPurchaseDate
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

function generic_error_handling(err, doc, res) {
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

var clothing_module = {
  add_new_clothing: add_new_clothing,
  delete_clothing: delete_clothing,
  get_all_user_clothing: get_all_user_clothing
}

module.exports = clothing_module;
