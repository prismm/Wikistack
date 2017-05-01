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
var models = require('./models');

//templating boilerplate setup
var env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//logging middleware
app.use(morgan('combined'));

//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serves up static files
app.use(express.static(path.join(__dirname, '/public')));

//use routes module to handle requests
app.use('/', routes);

//syncing db
models.User.sync({ force: true })
    .then(function() {
        return models.Page.sync({})
    })
    .then(function() {
        app.listen(1337, function() {
            console.log('Server is listening on port 1337!');
        });
    })
    .catch(console.error);