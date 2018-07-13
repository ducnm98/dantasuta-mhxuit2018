var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('Received method post');
  let insert = {
    name: req.body.name,
  }
  console.log('one')
  mongoose.model('users').create(insert, (err, result) => {
    if (err) throw err;
    console.log('two');
    mongoose.model('questions').find({}, (err, questionList) => {
      if (err) throw err;
      console.log('three')
      for (let i = 0; i < 3; i++) {
        let temp = randomIntFromInterval(1, questionList.length - 1);
        let insert = {
          user: result._id,
          questionID: questionList[temp]._id
        }
        mongoose.model('questionForUsers').create(insert, (err, done) => {
          console.log('four')
          if (err) throw err;
        })
      }
      let link = `/question/${result._id}`
      return res.redirect(link)
      next();
    })
  })
});

module.exports = router;
