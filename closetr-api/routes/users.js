const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

// users schema
const users = require('../models/users.model');

/* API sets one new user clothing */
router.post('/register', function(req, res, next) {
  // gather attributes from request
  var user = req.body.user;
  const newItem = {
    userID: user.userID,
    userName: user.userName,
    userPassword: user.userPassword
  };
  var error = '', status = '';

  users.find(
    {userID: user.userID},
    function (err, doc) {
      if (err) {
        const result_json = {
          status: 'failed',
          message: error
        };
        res.json(result_json);
      } else {
        if (doc.length != 0) {
          const result_json = {
            status: 'failed',
            message: 'user already exists.'
          };
          res.json(result_json);
        } else {
          createNewUser();
        }
      }
    }
  );

  function createNewUser () {
    // new user path
    newItem['_id'] = mongoose.Types.ObjectId();

    // create new clothing from clothes schema
    users.findOneAndUpdate(
      {_id: newItem._id},
      newItem,
      {upsert: true, new: true, runValidators: true},
      function (err, doc) {
        if (err) {
          const result_json = {
            status: 'failed',
            message: err.message
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
    );
  }

});


/* API returns true if passed user and password
matches a pair in the database. */
router.post('/login', function(req, res, next) {
  var user = req.body.user;
  // query all clothes in the database
  users.find(
    {userID: user.userID},
    function (err, doc) {
      if (err) {
        const result_json = {
          status: 'failed',
          message: err.message
        };
        res.json(result_json);
      } else {
        var result = false;
        if (doc != {}) {
          doc.forEach(function(dbUser) {
            result = (
              (dbUser.userID == user.userID)
              && (dbUser.userPassword == user.userPassword)
            );
          });
        }
        const result_json = {
          status: 'success',
          data: result
        };
        res.json(result_json);
      }
    }
  );
});

module.exports = router;
