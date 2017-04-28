'use strict';
//importing modules
var express = require('express');
var app = express();
var nunjucks = require('nunjucks');
var routes = require('./routes');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');


//templating boilerplate setup
var env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//logging middleware
app.use(morgan);

//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//start the server
app.listen(1337, function() {
    console.log('listening on port 1337');
});

//serves up static files
app.use(express.static(path.join(__dirname, '/public')));

//use routes module to handle requests
app.use('/', routes);