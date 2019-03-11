const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothes = new Schema({
  clothingName: {type: String, default:'', trim:true},
  clothingCost: {type: Number, default:0},
  clothingWorn: {type: Number, default:0},
  clothingCategory: {type: String, default:'', trim:true},
  clothingPurchaseDate: {type: String, default:'', trim:true},
  user: {ref:'users', type: Schema.Types.ObjectId, trim:true}
})

module.exports = mongoose.model('clothes', clothes);
