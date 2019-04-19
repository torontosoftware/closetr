const express = require('express');
const mongoose = require('mongoose');
const clothes_model = require('./clothes.model');

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
    (err, doc) => generic_error_handling(err, doc, res)
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
    (err, doc) => generic_error_handling(err, doc, res)
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
  success_callback_error_handling(err, clothing_loading_wrapper);
  res.json(result_json);
}

function get_all_clothing_loading(doc) {
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
  const result_json = generic_success(result);

  return result_json
}

function generic_error_handling(err, payload, res) {
  generic_success_wrapper = function(){ return generic_success(payload); };
  result_json = success_callback_error_handling(err, generic_success_wrapper)
  res.json(result_json);
}

function generic_success(payload) {
  const result_json = {
    status: 200,
    data: payload
  };
  return result_json
}

/**
 *
 */
function generic_fail(){
  const result_json = {
    status: 500,
    message: err.message,
  };
  return result_json;
}

/**
 * @desc Returns the resulting json of a generic fail if there is an error, or
 * calls a callback_function with no arguments otherwise.
 * @returns the result as a json
 * @param err error that determines success or failure
 * @param callback_function function that is called if no error is found
 */
function success_callback_error_handling(err, callback_function) {
  if (err) {
    result_json = generic_fail()
  } else {
    result_json = callback_function();
  }
  return result_json
}

var clothing_module = {
  add_new_clothing: add_new_clothing,
  delete_clothing: delete_clothing,
  get_all_user_clothing: get_all_user_clothing
}

module.exports = clothing_module;
