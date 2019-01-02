const express = require('express');
const router = express.Router();

// clothes schema
const clothes = require('../models/clothes');

const hardcoded_data = [
  {_id: 1, cost: 45, name:'Aritzia TShirt', worn_count: 45, category:'TShirt'},
  {_id: 2, cost: 35, name:'Zara Turtleneck TShirt', worn_count: 32, category:'TShirt'},
  {_id: 3, cost: 99, name:'Aritzia Sweater', worn_count: 23, category:'Sweater'},
  {_id: 4, cost: 35, name:'Uniqlo Palazzo Pants', worn_count: 17, category:'Pants'},
  {_id: 5, cost: 5, name:'Uniqlo Socks', worn_count: 16, category:'Socks'},
  {_id: 6, cost: 35, name:'Zara Cocoon Cardigan', worn_count: 15, category:'Cardigan'}
]

/* GET users listing. */
router.get('/', function(req, res, next) {

  // return hardcoded values for now
  const result_json = {
    status: 'success',
    data: hardcoded_data
  }
  res.json(result_json)

  // // query all clothes in the database
  // clothes.find()
  // .then(clothes => {
  //   // if success, create response json
  //   const result_json = {
  //     status: 'success',
  //     data: clothes
  //   }
  //   // send response json
  //   res.json(result_json)
  // })
  // .catch(err => {
  //   // if fail, create response json
  //   const result_json = {
  //     status: 'failed',
  //     message: err.message
  //   }
  //   // send response json
  // })

});

module.exports = router;
