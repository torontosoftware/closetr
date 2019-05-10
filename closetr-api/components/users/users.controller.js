const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users_model = require('./users.model');
const rh = require('../common/result_handling');
const async_mongo = require('../common/async_mongo');

/* API updates one user */
async function update_user_info (req, res, next) {
  // gather attributes from request
  const req_user = req.body.user;

  try {
    let decoded = await wt.verify(user.token, 'secret');
    req.decoded = decoded;

    let user_from_db = await users_model.findOneAndUpdate({userID: req_user.userID},
      { $set: {userName: req_user.userName, userDesc: req_user.userDesc}},
      {upsert: true, new: true, runValidators: true});
    const user_payload = {
      userName: user_from_db.userName,
      userDesc: user_from_db.userDesc
    }
    const result_json = rh.return_success(user);
    res.json(result_json);
  } catch (err) {
    const result_json = {
      status: 'failed',
      message: 'Failed to authenticate token.'
    };
    console.log("failed authenticate token");
    res.json(result_json);
  }
}

/* API sets one new user clothing */
async function register_new_user(req, res, next) {
  // gather attributes from request
  let user = req.body.user;
  const newItem = {
    userID: user.userID,
    userName: user.userName,
    userPassword: bcrypt.hashSync(user.userPassword, 8)
  };
  let error = '', status = '';

  try {
    let user_list = await users_model.find({userID: user.userID});
    // check if the user already exists
    if (user_list.length != 0) {
      const result_json = {
        status: 'failed',
        message: 'user already exists.'
      };
      res.json(result_json);
    }

    // add new if if user did not already exist
    newItem['_id'] = mongoose.Types.ObjectId();
    let new_user = await async_mongo.findOneAndUpdate(users_model, newItem);
    const token = jwt.sign({id: doc._id}, 'secret', {expiresIn: 86400});
    const user_payload = {
      userID: new_user.userID,
      userName: new_user.userName,
      id: new_user._id,
      token: token
    }
    const result_json = {
      data: user,
      status: 'success',
      auth: true,
      token: token
    };
    res.json(result_json);

  } catch (err) {
    const result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

/* API returns true if passed user and password
matches a pair in the database. */
async function check_login_credentials(req, res, next) {
  let user = req.body.user;
  // query all clothes in the database
  try {
    let users_from_db = await users_model.find({userID: user.userID})

    let password_is_valid = false;
    if(user_from_db != {}) {
      users_from_db.forEach(function(dbUser) {
        if (dbUser.userID == user.userID) {
          let passwordValidate = bcrypt.compareSync(
            user.userPassword, dbUser.userPassword);
          password_is_valid = passwordValidate;
        }
      });
    }
    if(password_is_valid) {
      const token_payload = jwt.sign({id: doc._id}, 'secret', { expiresIn: 86400 });
      const user_payload = create_user_payload(doc[0], token_payload);
      const result_json = {
        data: user_payload,
        status: 200,
        auth: true,
        token: token_payload
      };
      res.json(result_json);
    } else {
      const result_json = {
        status: 401,
        auth: false,
        token: null
      }
      res.json(result_json);
    }
  } catch (err) {
    const result_json = rh.return_failure(err);
    res.json(result_json);
  }
}

function create_user_payload(user_document, token_payload) {
  const user_payload = {
    userID: user_document.userID,
    userName: user_document.userName,
    userDesc: user_document.userDesc,
    id: user_document._id,
    token: token_payload
  }
  return user_payload;
}

var users_module = {
  update_user_info: update_user_info,
  register_new_user: register_new_user,
  check_login_credentials: check_login_credentials
}

module.exports = users_module;
