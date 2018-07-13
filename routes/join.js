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
    startTime: new Date(),
    endTime: new Date().getTime() + (10 * 60 * 1000)
  }
  mongoose.model('users').create(insert, (err, result) => {
    if (err) throw err;
    mongoose.model('questions').find({}, (err, questionList) => {
      if (err) throw err;
      for (let i = 0; i < 15; i++) {
        let temp = randomIntFromInterval(1, questionList.length - 1);
        let insert = {
          user: result._id,
          questionID: questionList[temp]._id
        }
        mongoose.model('questionForUsers').create(insert, (err, done) => {
          if (err) throw err;
          questionList.slice(temp - 1,1);
        })
      }
      let link = `/question/${result._id}`
      return res.redirect(link)
    })
  })
    

    

  //  res.send(req.body)
});

module.exports = router;
