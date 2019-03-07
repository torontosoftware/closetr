const outfit_entries_model = require('./outfit_entries.model');
const mongoose = require('mongoose');

function add_new_entry(req, res, next) {
  // gather attributes
  const req_obj = req.body;
  console.log(req.body,"add new entry body");
  const new_entry = {
    clothingID: req_obj.clothingID,
    userID: req_obj.userID,
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

function get_entry(req, res, next) {
  const criteria = req.query.criteria;
  console.log(req.body,"get entry body");
  outfit_entries_model.find(
    {},
    (err, doc) => generic_error_handling(err, doc, res)
  );
}

function generic_error_handling(err, doc, res) {
  console.log(doc);
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
  get_entry
}

module.exports = outfit_entries_module;
