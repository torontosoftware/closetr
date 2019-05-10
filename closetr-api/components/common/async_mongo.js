const rh = require('./result_handling');

async function findOneAndUpdate(model, item){
  let promise = model.findOneAndUpdate(
    {_id: item._id},
    item,
    {
      upsert: true,
      new: true,
      runValidators: true
    }
  ).exec();
  return promise
}

var async_mongo_module = {
  findOneAndUpdate: findOneAndUpdate
}

module.exports = async_mongo_module
