const mongoose = require('mongoose');
const clothes = require('/clothes.model.js');
const clothesSchema = mongoose.model('clothes').schema;
const Schema = mongoose.Schema;

const closets = new Schema({
  userID: {type: String, default:'', trim:true},
  closet: {type: Array, default:[], trim:true}
})

module.exports = mongoose.model('closets', closets);
