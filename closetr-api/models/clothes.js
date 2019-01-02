const mongoose = require('mongoose')

const clothes = new mongoose.Schema({
  name: {type: String, default:'', trim:true},
  cost: {type: Number, default:0},
  worn_count: {type: Number, default:0},
  category: {type: String, default:'', trim:true}
})

module.exports = mongoose.model('clothes', clothes)
