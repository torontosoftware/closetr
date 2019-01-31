const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//userID is the username
const users = new Schema({
  userID: {type: String, default:'', trim:true},
  userName: {type: String, default:'', trim:true},
  userPassword: {type: String, default:'', trim:true}
})

module.exports = mongoose.model('users', users);
