const outfit_entries_model = require('./outfit_entries.model');
const clothes_model = require('../clothes/clothes.model');
const mongoose = require('mongoose');
const rh = require('../common/result_handling');

async function add_new_entry(req, res, next) {
  // gather attributes
  const entry_request = req.body;
  const new_entry = create_entry_from_request(entry_request);

  try {
    let payload = await outfit_entries_model.findOneAndUpdate({_id: new_entry._id},
      new_entry, {upsert: true, new: true, runValidators: true});
      const result_json = rh.return_success(payload);
      res.json(result_json);
  } catch (err) {
    const result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

function create_entry_from_request(entry_request) {
  const new_entry = {
    clothing: entry_request.clothingID,
    user: entry_request.userID,
    date: entry_request.date,
    outfitEntryID: entry_request.outfitEntryID
  };

  // assigning id
  if(entry_request.outfitEntryID == null){
    new_entry['_id'] = mongoose.Types.ObjectId();
  } else {
    new_entry['_id'] = entry_request.outfitEntryID;
  }

  return new_entry;
}

async function delete_entry(req, res, next) {
  const id = req.params.id;
  try {
    let payload = await outfit_entries_model.remove({_id: id});
    const result_json = rh.return_success(payload);
    res.json(result_json);
  } catch (err) {
    const result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

async function get_entry(req, res, next) {
  const criteria = req.query;
  let clothes;
  try {
    let outfit_entries = await outfit_entries_model.find({user: criteria.userID, date: criteria.date})
      .populate('clothing')
      .populate({path: 'user', select: 'userID _id'}).exec();
    let outfit_entries_payload = clothes.map(db_to_payload_entries);
    const result_json = rh.return_success(outfit_entries_payload);
    res.json(result_json);
  } catch (err) {
    result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

function db_to_payload_entries(outfit_entries) {
  let outfit_entry_payload = {
    outfitEntryID: outfit_entries._id,
    user: outfit_entries.user,
    clothing: outfit_entries.clothing,
    date: outfit_entries.date
  };
  return outfit_entry_payload;
}

var outfit_entries_module = {
  add_new_entry,
  get_entry,
  delete_entry
}

module.exports = outfit_entries_module;
