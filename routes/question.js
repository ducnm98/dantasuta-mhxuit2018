var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

findAnswer = (myAnswer, answerList, callback) => {
  return answerList.map(item => {
    if (item.answerName === myAnswer) {
      return callback(item.isAnswer);
    }
  })
};

// Nó không qua trang câu hỏi tiếp theo mà nó báo lỗi nhưu vậy
// code ở đây, để mình demo cho bác xem thử

router.get('/:id', function(req, res, next) {
  let query = {
    user: req.params.id,
    isDone: false,
  };
  mongoose.model('users').findById(req.params.id, (err, result) => {
    if (err) throw err;
    if (result) {
      mongoose.model('questionForUsers').findOne(query)
      .populate('questionID')
      .exec((err, question) => {
        if (err) throw err;
        console.log('question', question)
        if (question) {
          res.render('question', {
            question: question,
            questionID: question.questionID._id,
            title: 'Dân ta sử ta',
            id: req.params.id
          })
        } 
        else {
          let query = {
            user: req.params.id,
            isCorrect: true,
          }
          mongoose.model('questionForUsers').find(query, async (err, point) => {
            if (err) throw err;
            console.log('point', point)
            mongoose.model('users').findByIdAndUpdate(req.params.id, { point: point.length } , async (err, user) => {
              if (err) throw err;
              if (user) {
                res.render('doneAnswerQuestion', {
                  name: user.name,
                  point: user.point,
                })
              }
            })
          })
        }
      })
    } 
    else {
      res.redirect('/');
    }
  })
})


router.post('/:id', function(req, res, next) {
  console.log(req.body)
  console.log('call one')
  mongoose.model('questions').findById(req.body.questionID, (err, result) => {
    if (err) throw err;
    console.log('call two')
    if (result) {
      result.answers.map((item, index) => {
        if (item.answerName == req.body.radio) {
          console.log('call three')
          let query = {
            user: req.params.id,
            questionID: req.body.questionID
          };
          let update = {
            isDone: true,
            isCorrect: item.isAnswer,
          }
          let option = {
            new: false,
          };
          mongoose.model('questionForUsers').findOneAndUpdate(query, update, option, (err, done) => {
            if (err) throw err;
            if (done) {
              console.log('call four')
              console.log('done', done)
              let link = '/question/' + done.user;
              return res.redirect(link);
            }
          })
        }
      })
    }
  //   // findAnswer(req.body.radio, result.answers, (isCorrect => {
      
  //   // }))
  })
})


module.exports = router;
