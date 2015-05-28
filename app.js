var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var handlebars = require('express-handlebars');
var session = require('express-session');
var dotenv = require('dotenv');

var indexRoute = require('./routes/index');
var dataRoute = require('./routes/data');

var app = express();

//client id and client secret here, taken from .env
dotenv.load();

// view engine setup
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat',
                  saveUninitialized: true,
                  resave: true}));

app.use('/', indexRoute);
app.use('/data', dataRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + 3000);
});

module.exports = app;
