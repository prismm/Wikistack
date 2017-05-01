'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
// var nunjucks = require('nunjucks');

module.exports = router;

router.get('/', function(req, res) {
    res.render('../views/wikipage');
});

router.get('/add', function(req, res) {
    res.render('addpage');
});

router.get('/:title', function(req, res) {
    Page.findOne({
            where: {
                urltitle: req.params.title
            }
        })
        .then(function(result) {
            if (result) {
                res.render('wikipage', { page: result });
            } else {
                throw new Error;
            }
        })
        .catch(function() {
            res.status(404);
            res.send('Article not found!')
        });
});

router.post('/', function(req, res, next) {

    User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })
        .save()
        .then(function() {
            return Page.build({
                title: req.body.title,
                content: req.body.content,
                authorid: user.id
            })
        })
        .save()
        .then(function(page) {
            res.redirect(page.route);
        })
        .catch(next);
});