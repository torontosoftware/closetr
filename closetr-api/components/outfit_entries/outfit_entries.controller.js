const outfit_entries_model = require('./outfit_entries.model');
const clothes_model = require('../clothes/clothes.model');
const mongoose = require('mongoose');
const error_handling = require('../common/error_handling');

function add_new_entry(req, res, next) {
  // gather attributes
  const outfit_entry_object = req.body;
  const outfit_entry_payload = extract_outfit_entry_payload_from_object(outfit_entry_object)
  // create new entry from schema
  outfit_entries_model.findOneAndUpdate(
    {_id: outfit_entry_payload._id},
    new_entry,
    {upsert: true, new: true, runValidators: true},
    (err, doc) => error_handling.generic_error_handling(err, doc, res)
  );
}

function extract_outfit_entry_payload_from_object(outfit_entry_object) {
  let new_entry = {
    clothing: outfit_entry_object.clothingID,
    user: outfit_entry_object.userID,
    date: outfit_entry_object.date,
    outfitEntryID: outfit_entry_object.outfitEntryID
  };

  // assigning id
  if(outfit_entry_object.outfitEntryID == null){
    new_entry['_id'] = mongoose.Types.ObjectId();
  } else {
    new_entry['_id'] = outfit_entry_object.outfitEntryID
  }
  return new_entry
}

function delete_entry(req, res, next) {
  const id = req.params.id;
  outfit_entries_model.remove(
    {_id: id},
    (err, doc) => generic_error_handling(err, doc, res)
  )
}

function get_entry(req, res, next) {
  const criteria = req.query;
  let clothes;
  outfit_entries_model.find({
    user: criteria.userID,
    date: criteria.date
  })
  .populate('clothing')
  .populate({path: 'user', select: 'userID _id'}).exec(
    (err, clothes) => get_entry_error_handling(err, clothes, res)
  );
}

function get_entry_error_handling(err, clothes, res) {
  get_outfit_entry_wrapper = function() { return outfit_entry_doc_handler(clothes, res); };
  result_json = error_handling.generic_callback_error_handling(err, get_outfit_entry_wrapper);
  res.json(result_json);
}

function outfit_entry_doc_handler(outfit_entries_from_db, res) {
  let payload = outfit_entries_from_db.map(db_outfit_entry_to_obj_outfit_entry);
  const result_json = error_handling.eneric_success(payload);
  return result_json
}

function db_outfit_entry_to_obj_outfit_entry(db_outfit) {
  const obj_oufit_entry = {
    outfitEntryID: db_outfit._id,
    user: db_outfit.user,
    clothing: db_outfit.clothing,
    date: db_outfit.date
  };
  return obj_oufit_entry
}

var outfit_entries_module = {
  add_new_entry,
  get_entry,
  delete_entry
}

module.exports = outfit_entries_module;
