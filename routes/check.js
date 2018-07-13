var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoose.model('questions').find({}, (err, result) => {
    res.send(result);
  })
});

module.exports = router;
