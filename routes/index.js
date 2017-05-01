'use strict';
var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki')
var userRouter = require('./user')
var models = require('../models');
var Page = models.Page;
module.exports = router;


// router.use('/', function(req, res, next) {
//     // res.send("OK")
//     // next()

// });
router.get('/', function(req, res) {
    Page.findAll()
        .then(result => res.render('../views/index', { wikipages: result }))

})

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);