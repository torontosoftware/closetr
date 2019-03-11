const outfit_entries_model = require('./outfit_entries.model');
const clothes_model = require('../clothes/clothes.model');
const mongoose = require('mongoose');

function add_new_entry(req, res, next) {
  // gather attributes
  const req_obj = req.body;
  const new_entry = {
    clothing: req_obj.clothingID,
    user: req_obj.userID,
    date: req_obj.date,
    outfitEntryID: req_obj.outfitEntryID
  };

  // assigning id
  if(req_obj.outfitEntryID == null){
    new_entry['_id'] = mongoose.Types.ObjectId();
  } else {
    new_entry['_id'] = req_obj.outfitEntryID
  }

  // create new entry from schema
  outfit_entries_model.findOneAndUpdate(
    {_id: new_entry._id},
    new_entry,
    {upsert: true, new: true, runValidators: true},
    (err, doc) => generic_error_handling(err, doc, res)
  );
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
  outfit_entries_model.find()
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
