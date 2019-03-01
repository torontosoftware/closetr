const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outift_entries = new Schema({
  outfitEntryID: {type: String, default:'', trim:true},
  clothingID: {type: String, default:'', trim:true},
  userID: {type: String, default:'', trim:true},
  date: {type: String, default:'', trim:true}
})