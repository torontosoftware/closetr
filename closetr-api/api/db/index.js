const mongoose = require('mongoose');

function apply_db_connection (app) {
  mongo_connect_string = create_mongo_str_from_env()
  mongoose.connect(mongo_connect_string, { useNewUrlParser: true });
  var db = mongoose.connection;
  return app
}

function create_mongo_str_from_env() {
  user = process.env.DB_USER
  pass = process.env.DB_PASS
  host = process.env.DB_HOST
  port = process.env.DB_PORT
  name = process.env.DB_NAME
  return 'mongodb://' + user + ':' + pass + '@' + host + ':' + port + '/' + name
}

module.exports = apply_db_connection
