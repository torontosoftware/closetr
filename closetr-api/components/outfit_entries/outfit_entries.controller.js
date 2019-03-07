const outfit_entries_model = require('./outfit_entries.model');
const clothes_model = require('./clothes.model');
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
  let clothes;
  let outfit_entries;
  console.log(req.body,"get entry body");
  clothes_model.find(
    {userID: criteria.userID},
    (err, doc) => {
      if (err) {
        error_handler(res);
      } else {
        clothes = closet_doc_handler(doc)
      }
    }
  );
  outfit_entries_model.find(
    criteria,
    (err, doc) => {
      if (err) {
        error_handler(res)
      } else {
        outfit_entries = outfit_entry_doc_handler(doc);
      }
    }
  );
  let outfit_entries_mod = closet_outfit_entry_handler(clothes, outfit_entries);
  const result_json = {
    status: 'success',
    data: outfit_entries_mod
  };
  res.json(result_json);
}

function error_handler(res) {
  const result_json = {
    status: 'failed',
    message: err.message
  };
  res.json(result_json);
}

function closet_doc_handler(doc) {
  let result = [];
  doc.forEach((clothing) => {
    let clothingResult = {
      clothingID: clothing._id,
      clothingName: clothing.clothingName,
      clothingCategory: clothing.clothingCategory,
      clothingWorn: clothing.clothingWorn,
      clothingCost: clothing.clothingCost,
      clothingPurchaseDate: clothing.clothingPurchaseDate
    };
    result.push(clothingResult);
  });
  return result;
}

function outfit_entry_doc_handler(doc) {
  let result = [];
  doc.forEach((outfitEntry) => {
    let outfitEntryResult = {
      outfitEntryID: outfitEntry._id,
      userID: outfitEntry.userID,
      clothingID: outfitEntry.clothingID,
      date: outfitEntry.date
    };
    result.push(outfitEntryResult);
  });
  return result;
}

function closet_outfit_entry_handler(clothes, outfit_entries) {

}

function get_entry_handler(err, doc, res) {
  if (err) {
    const result_json = {
      status: 'failed',
      message: err.message
    };
    res.json(result_json);
  } else {
    var result = [];
    doc.forEach((outfitEntry) => {
      var outfitEntryResult = {
        outfitEntryID: outfitEntry._id,
        userID: outfitEntry.userID,
        clothingID: outfitEntry.clothingID,
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
