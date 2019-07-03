const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const indexRouter = require('@components/index/index');
const clothesRouter = require('@components/clothes/clothes');
const usersRouter = require('@components/users/users');
const outfitEntriesRouter = require('@components/outfit_entries/outfit_entries');
const bodyParser = require('body-parser');
const createError = require('http-errors');

function get_express_app() {
  const app = express();
  app = apply_misc_middleware(app)
  app = apply_routes(app)
  app = apply_body_parser(app)
  app = apply_db_connection(app)
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

function apply_routes (app) {
  app.use('/', indexRouter);
  app.use('/api/clothes/', clothesRouter);
  app.use('/api/users/', usersRouter);
  app.use('/api/outfitEntries/', outfitEntriesRouter);
  return app
}

function apply_body_parser (app) {
  app.use(bodyParser.urlencoded({
     extended: true
  }));
  app.use(bodyParser.json());
  return app
}

function apply_db_connection (app) {
  mongo_connect_string = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
  mongoose.connect(mongo_connect_string, { useNewUrlParser: true });
  var db = mongoose.connection;
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
