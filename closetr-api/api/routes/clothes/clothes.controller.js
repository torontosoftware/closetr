const express = require('express');
const mongoose = require('mongoose');
const clothes_model = require('./clothes.model');
const rh = require('@common/result_handling');
const async_mongo = require('@common/async_mongo');

async function add_new_clothing(req, res, next) {
  // gather attributes from request
  const clothing = req.body.clothing;
  const clothing_payload = create_clothing_payload_from_request(clothing);

  try {
    let payload = await async_mongo.findOneAndUpdate(clothes_model, clothing_payload);
    const result_json = return_success(payload);
    res.json(result_json);
  } catch (err) {
    const result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

function create_clothing_payload_from_request(clothing) {
  let clothing_payload = create_payload_from_clothing_common(clothing);
  clothing_payload.user = clothing.userID
  if (clothing.clothingID == null) {
    clothing_payload['_id'] = mongoose.Types.ObjectId();
  } else {
    clothing_payload['_id'] = clothing.clothingID;
  }
  return clothing_payload
}

async function delete_clothing(req, res, next) {
  try {
    const clothingID = req.params.clothing_id;
    let clothing_payload = await clothes_model.remove({_id: clothingID});
    const result_json = rh.return_success(clothing_payload);
    res.json(result_json);
  } catch (err) {
    const result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

async function get_all_user_clothing(req, res, next) {
  try {
    const userID = req.query.userID;
    let all_user_clothing = await clothes_model.find({user: userID});
    let result = all_user_clothing.map(db_to_payload);
    const result_json = rh.return_success(result);
    res.json(result_json);
  } catch (err) {
    const result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

function db_to_payload_object(clothing) {
  let payload = create_payload_from_clothing_common(clothing);
  payload.clothingID = clothing._id;
  return payload;
}

function create_payload_from_clothing_common (clothing) {
  let payload = {
    clothingName: clothing.clothingName,
    clothingCategory: clothing.clothingCategory,
    clothingWorn: clothing.clothingWorn,
    clothingCost: clothing.clothingCost,
    clothingPurchaseDate: clothing.clothingPurchaseDate
  }
  return payload
}

var clothing_module = {
  add_new_clothing: add_new_clothing,
  delete_clothing: delete_clothing,
  get_all_user_clothing: get_all_user_clothing
}

module.exports = clothing_module;
