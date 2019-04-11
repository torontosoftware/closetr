const express = require('express');
const mongoose = require('mongoose');
const clothes_model = require('./clothes.model');
const error_handling = require('../common/error_handling');

/**
 * @desc Add a new clothing to the database given a clothing object in the
 * request body
 */
function add_new_clothing(req, res, next) {
  // gather attributes from request
  const clothing = req.body.clothing;
  const newItem = extract_clothing_payload_from_clothing_object(clothing);

  // create new clothing from clothes schema
  clothes_model.findOneAndUpdate(
    {_id: newItem._id},
    newItem,
    {upsert: true, new: true, runValidators: true},
    (err, doc) => error_handling.generic_error_handling(err, doc, res)
  );
}

/**
 * @desc Delete a specific clothing from @code{clothing_id} in the request params
 */
function delete_clothing(req, res, next) {
  // gather attributes from request
  const clothingID = req.params.clothing_id;
  // create new clothing from clothes schema
  clothes_model.remove(
    {_id: clothingID},
    (err, doc) => error_handling.generic_error_handling(err, doc, res)
  );
}

function get_all_user_clothing(req, res, next) {
  // query all clothes in the database
  const userID = req.query.userID;
  clothes_model.find(
    {user: userID},
    (err, doc) => get_all_clothing_error_handling(err, doc, res)
  );
}

function extract_clothing_payload_from_clothing_object(clothing) {
  let newItem = {
    clothingName: clothing.clothingName,
    clothingCost: clothing.clothingCost,
    clothingCategory: clothing.clothingCategory,
    clothingWorn: clothing.clothingWorn,
    clothingPurchaseDate: clothing.clothingPurchaseDate,
    user: clothing.userID
  };

  if (clothing.clothingID == null) {
    newItem['_id'] = mongoose.Types.ObjectId();
  } else {
    newItem['_id'] = clothing.clothingID;
  }

  return newItem
}

function get_all_clothing_error_handling(err, doc, res) {
  clothing_loading_wrapper = function(){ return get_all_clothing_loading(doc); };
  result_json = error_handling.generic_callback_error_handling(err, clothing_loading_wrapper);
  res.json(result_json);
}

function get_all_clothing_loading(clothing_from_db) {
  const payload = clothing_from_db.map(db_clothing_to_obj_clothing)
  const result_json = error_handling.generic_success(payload);
  return result_json
}

function db_clothing_to_obj_clothing(db_clothing) {
  const obj_clothing = {
    clothingID: db_clothing._id,
    clothingName: db_clothing.clothingName,
    clothingCategory: db_clothing.clothingCategory,
    clothingWorn: db_clothing.clothingWorn,
    clothingCost: db_clothing.clothingCost,
    clothingPurchaseDate: db_clothing.clothingPurchaseDate
  }
  return obj_clothing
}

var clothing_module = {
  add_new_clothing: add_new_clothing,
  delete_clothing: delete_clothing,
  get_all_user_clothing: get_all_user_clothing
}

module.exports = clothing_module;
