const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfit_entries = new Schema({
  outfitEntryID: {type: String, default:'', trim:true},
  clothingID: {ref: 'clothes', type: String, default:'', trim:true},
  userID: {ref: 'users', type: String, default:'', trim:true},
  date: {type: String, default:'', trim:true}
})

module.exports = mongoose.model('outfit_entries', outfit_entries);
