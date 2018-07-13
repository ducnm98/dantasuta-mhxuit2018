var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('awgw')
  res.render('addQuestion');
});

router.post('/', (req, res, next) => {
  let answer = []
  answer.push({
    answerName: req.body.answer1,
    isAnswer: req.body.checkbox1 ? true : false,
  })
  answer.push({
    answerName: req.body.answer2,
    isAnswer: req.body.checkbox2 ? true : false,
  })
  answer.push({
    answerName: req.body.answer3,
    isAnswer: req.body.checkbox3 ? true : false,
  })
  answer.push({
    answerName: req.body.answer4,
    isAnswer: req.body.checkbox4 ? true : false,
  })
  let insert = {
    questionName: req.body.questionName,
    answers: answer
  }
  mongoose.model('questions').create(insert, (err, result) => {
    if (err) throw err;
    res.redirect('/addquestion')
  })
})

module.exports = router;
