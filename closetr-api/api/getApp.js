const express = require('express');
const routes = require('@routes');
const db = require('@db');
const middleware = require('./middleware');
const errorHandling = require('./errorHandling');
const { compose } = require('@utils');

module.exports = () => {
    let app = express();
    const funcs = [errorHandling, db, routes, middleware];
    return compose(...funcs)(app);
};
