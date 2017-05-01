'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


module.exports = router;

router.get('/', function(req, res) {

    // res.status(200)
    // res.send("test");
    // res.render('index');
    res.render('../views/wikipage');
});

router.get('/add', function(req, res) {
    res.render('addpage');
});

router.get('/:title/edit', function(req, res) {

    // res.status(200)
    // res.send("test");
    // res.render('index');
    res.render('../views/wikipage');
});





router.post('/', function(req, res, next) {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
    console.log("==================> req.body")
    console.dir(req.body);


    var page = Page.build({
        title: req.body.user,
        content: req.body.content,
        urlTitle: req.body.title
    });

    console.log("==================> Page object:")
    console.dir(page);

    // STUDENT ASSIGNMENT:
    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise or it can take a callback.
    page.save()
        .then(res.redirect('/'));
    // -> after save -> res.redirect('/');
});