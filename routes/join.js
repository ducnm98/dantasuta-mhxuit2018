var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
/* GET home page. */
router.post('/', function(req, res, next) {
  // console.log('Received method post');
  let startTime = new Date();
  let endTime = new Date(startTime.setMinutes(startTime.getMinutes() + 10 ));
  let insert = {
    name: req.body.name,
    startTime: startTime,
    endTime: endTime
  }
  // console.log('insert', insert)
  mongoose.model('users').create(insert, (err, result) => {
    if (err) throw err;
    mongoose.model('questions').find({}, (err, questionList) => {
      if (err) throw err;
      for (let i = 0; i < 15; i++) {
        let temp = randomIntFromInterval(1, questionList.length - 1);
        let question = questionList.splice(temp - 1, 1);
        // console.log('temp',  temp)
        // console.log('length', questionList.length)
        // console.log('question', question)
        // console.log('questionList', questionList)
        if (questionList[0] != null) {
          let insert = {
            user: result._id,
            questionID: question[0]._id
          }
          mongoose.model('questionForUsers').create(insert, (err, done) => {
            if (err) throw err;
          })
        } else {
          break;
        }
      }
      let link = `/question/${result._id}`
      return res.redirect(link)
    })
  })
    

    

  //  res.send(req.body)
});

module.exports = router;
