'use strict';
var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki')
var userRouter = require('./user')

module.exports = router;


// router.use('/', function(req, res, next) {
//     // res.send("OK")
//     // next()

// });
router.get('/', function(req, res) {
    res.render('../views/index')
})
router.use('/wiki', wikiRouter);
router.use('/users', userRouter);