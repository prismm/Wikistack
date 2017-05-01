'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


module.exports = router;

router.get('/', function(req, res) {
    res.render('../views/wikipage');
});

router.get('/add', function(req, res) {
    res.render('addpage');
});

router.get('/:title/edit', function(req, res) {
    res.render('../views/wikipage');
});

router.post('/', function(req, res, next) {
    var page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    // console.log("==================> Page object:")
    // console.dir(page);
    page.save()
        .then(function(returnval) { res.json(returnval) });
});