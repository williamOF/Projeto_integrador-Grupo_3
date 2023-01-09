var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const methodOverride =  require('method-override'); 
require('dotenv').config()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require('./routes/api')
const administradorController = require('./routes/administradorRouter')

var app = express();

// view engine setup
app.set('views', path.resolve(__dirname , 'views'));
app.set('view engine', 'ejs');


app.use(session({
  secret: process.env.PASSSESSION,
  resave: true,
  saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(methodOverride('_method'))

//routers declared
app.use('/', indexRouter);
app.use('/user', usersRouter)
app.use('/api', apiRouter)
app.use('/admin', administradorController)

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
  res.render('error');
});

module.exports = app;
