const outfit_entries_model = require('./outfit_entries.model');
const clothes_model = require('../clothes/clothes.model');
const mongoose = require('mongoose');

function add_new_entry(req, res, next) {
  // gather attributes
  const outfit_entry_object = req.body;
  const outfit_entry_payload = extract_outfit_entry_payload_from_object(outfit_entry_object)
  // create new entry from schema
  outfit_entries_model.findOneAndUpdate(
    {_id: outfit_entry_payload._id},
    new_entry,
    {upsert: true, new: true, runValidators: true},
    (err, doc) => generic_error_handling(err, doc, res)
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
}

function delete_entry(req, res, next) {
  const id = req.params.id;
  outfit_entries_model.remove(
    {_id: id},
    (err, doc) => {
      if (err) {
        error_handler(err, res);
      } else {
        doc_handler(doc, res);
      }
    }
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
      error_handler(err, res);
    } else {
      outfit_entry_doc_handler(clothes, res);
    }
  });
}

function error_handler(err, res) {
  const result_json = {
    status: 'failed',
    message: err.message
  };
  res.json(result_json);
}

function doc_handler(doc, res) {
  const result_json = {
    status: 'success',
    data: doc
  };
  res.json(result_json);
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
  const result_json = {
    status: 'success',
    data: result
  };
  res.json(result_json);
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

var outfit_entries_module = {
  add_new_entry,
  get_entry,
  delete_entry
}

module.exports = outfit_entries_module;
