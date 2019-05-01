const outfit_entries_model = require('./outfit_entries.model');
const clothes_model = require('../clothes/clothes.model');
const mongoose = require('mongoose');
const rh = require('../common/result_handling');

function add_new_entry(req, res, next) {
  // gather attributes
  const entry_request = req.body;
  const new_entry = create_entry_from_request(entry_request);

  // create new entry from schema
  outfit_entries_model.findOneAndUpdate(
    {_id: new_entry._id},
    new_entry,
    {upsert: true, new: true, runValidators: true},
    (err, doc) => rh.generic_error_conditional(err, doc, res)
  );
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

function delete_entry(req, res, next) {
  const id = req.params.id;
  outfit_entries_model.remove(
    {_id: id},
    (err, doc) => rh.generic_error_conditional(err, doc, res)
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
  (err, clothes) => {
    if (err) {
      result_json = rh.return_failure(err);
      res.json(result_json);
    } else {
      outfit_entry_doc_handler(clothes, res);
    }
  });
}

function outfit_entry_doc_handler(doc, res) {
  let result = [];
  doc.forEach((outfitEntry) => {
    let outfitEntryResult = {
      outfitEntryID: outfitEntry._id,
      user: outfitEntry.user,
      clothing: outfitEntry.clothing,
      date: outfitEntry.date
    };
    result.push(outfitEntryResult);
  });
  const result_json = rh.return_success(result);
  res.json(result_json);
}

var outfit_entries_module = {
  add_new_entry,
  get_entry,
  delete_entry
}

module.exports = outfit_entries_module;
