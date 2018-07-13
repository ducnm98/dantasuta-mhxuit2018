var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.post('/:id', function(req, res, next) {
  console.log(req.params.id)
  mongoose.model('questions').deleteOne({_id: req.params.id}, (err, result) => {
    res.redirect('/check');
  })
  // res.render('index', { 
  //   title: 'Express' 
  // });
});

module.exports = router;
