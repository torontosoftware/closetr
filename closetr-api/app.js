const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var cors = require('cors');

// config options for credentials
const config = require('./config')

// routers from route folder
var indexRouter = require('./components/index/index');
var clothesRouter = require('./routes/clothes');
var usersRouter = require('./routes/users');

// the express app
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: true}));

// connect app to routes
app.use('/', indexRouter);
app.use('/api/clothes/', clothesRouter);
app.use('/api/users/', usersRouter);

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongo_connect_string = 'mongodb://' + config.db.user + ':' + config.db.pass + '@' + config.db.host + ':' + config.db.port + '/' + config.db.database_name
mongoose.connect(mongo_connect_string, { useNewUrlParser: true });
var db = mongoose.connection;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
    });
});

// Setup server port
var port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("listening on port " + port);
});
