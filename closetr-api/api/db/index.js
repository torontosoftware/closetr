const mongoose = require('mongoose');
const { strFromENV } = require('@config');

const testConnection = () => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('MongoDB Connected');
  });
};

module.exports = (app) => {
  mongoStr = strFromENV()
  mongoose.connect(mongoStr, { useNewUrlParser: true });
  testConnection();
  return app
};
