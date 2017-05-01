'use strict';
var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res) {
    res.redirect('/');
});

router.get('/:id', function(req, res) {
    res.render('index');
});

router.post('/', function(req, res) {
    res.render('index');
});

router.put('/:id', function(req, res) {
    res.render('index');
});

router.delete('/:id', function(req, res) {
    res.render('index');
});