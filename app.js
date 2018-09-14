/**
 * Entry Point file
 * ProjectsDashboard
 */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let helmet = require('helmet');
let session = require('express-session');
let sha512 = require('js-sha512');

let indexRouter = require('./routes/index');
let loginRouter = require('./routes/auth');

let app = express();
let sess = {
    secret: sha512.create().update('DashboardTech').hex(),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.locals = {
    site: {
        name: "DashboardTech",
        nameStylish: '<b>Dashboard</b>Tech'
    },
    userData: null
};

app.use(session(sess));
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
