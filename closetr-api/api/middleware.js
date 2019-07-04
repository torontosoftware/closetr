const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('@routes');
const db = require('@db/index')
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');

function get_express_app() {
  let app = express();
  app = apply_misc_middleware(app)
  app = routes.apply_routes(app)
  app = apply_body_parser(app)
  app = db.apply_db_connection(app)
  app = apply_error_handling(app)
  return app
}

function apply_misc_middleware (app) {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cors({credentials: true, origin: true}));
  return app
}

function apply_body_parser (app) {
  app.use(bodyParser.urlencoded({
     extended: true
  }));
  app.use(bodyParser.json());
  return app
}

function apply_error_handling (app) {
  app.use(function(req, res, next) {
    next(createError(404));
  });
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
      });
  });
  return app
}

module.exports = {get_express_app}
