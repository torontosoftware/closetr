const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothes = new Schema({
  clothingID: {type: String, default:'', trim:true},
  clothingName: {type: String, default:'', trim:true},
  clothingCost: {type: Number, default:0},
  clothingWorn: {type: Number, default:0},
  clothingCategory: {type: String, default:'', trim:true}
})

module.exports = mongoose.model('clothes', clothes);
