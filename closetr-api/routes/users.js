const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// users schema
const users = require('../models/users.model');


/* API updates one user */
router.post('/update', function(req, res, next) {
  // gather attributes from request
  var user = req.body.user;
  var error = false;

  const newItem = {
    'userID': user.userID,
    'userName':user.userName,
    'userDesc':user.userDesc
  };

  jwt.verify(user.token, 'secret', function(err, decoded) {
    if (err) {
      const result_json = {
        status: 'failed',
        message: 'Failed to authenticate token.'
      };
      res.json(result_json);
      error = true;
    } else {
      req.decoded = decoded;
      next();
      updateUser();
    }
  });

  // create new clothing from clothes schema
  function updateUser() {
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


/* API sets one new user clothing */
router.post('/register', function(req, res, next) {
  // gather attributes from request
  var user = req.body.user;
  const newItem = {
    userID: user.userID,
    userName: user.userName,
    userPassword: bcrypt.hashSync(user.userPassword, 8)
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
          const token = jwt.sign({id: doc._id}, 'secret', {
            expiresIn: 86400
          });
          const user = {
            userID: doc.userID,
            userName: doc.userName,
            id: doc._id,
            token: token
          }
          const result_json = {
            data: user,
            status: 'success',
            auth: true,
            token: token
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
          status: 500,
          message: err.message
        };
        res.json(result_json);
      } else {
        var result = false;
        if (doc != {}) {
          doc.forEach(function(dbUser) {
            if (dbUser.userID == user.userID) {
              var passwordValidate = bcrypt.compareSync(user.userPassword, dbUser.userPassword);
              result = passwordValidate;
            }
          });
        }
        if (result) { // successful login
          const token = jwt.sign({id: doc._id}, 'secret', {
            expiresIn: 86400
          });
          const user = {
            userID: doc[0].userID,
            userName: doc[0].userName,
            id: doc[0]._id,
            token: token
          }
          const result_json = {
            data: user,
            status: 200,
            auth: true,
            token: token
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
      }
    }
  );
});

module.exports = router;
