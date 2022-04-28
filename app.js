var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var homepageRouter = require('./routes/homepage')

var hbs=require('express-handlebars');
var app = express();
var fileUpload =require('express-fileupload');
var db = require('./config/connection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',//layout folder route setting
  partialsDir: __dirname + '/views/partials' //partials folder route setting
}))




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// fileupload for image retrive from the form
app.use(fileUpload());

//connecting DB
db.connect((err)=>{
if(err) console.log("Connection Error"+err);
else console.log("Database Connection Successful");
});

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/homepage',homepageRouter);

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
