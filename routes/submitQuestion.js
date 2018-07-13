var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

findAnswer = (myAnswer, answerList, callback) => {
  answerList.map(item => {
    if (item.answerName == myAnswer) {
      return callback(item.isAnswer);
    }
  })
};

router.post('/:id', (req, res, next) => {
  mongoose.model('questions').findById(req.body.questionID, (err, result) => {
    if (err) throw err;
    findAnswer(req.body.radio, result.answers, (isCorrect => {
      let query = {
        user: req.params.id,
        questionID: req.body.questionID
      };
      let update = {
        isDone: true,
        isCorrect: isCorrect,
      }
      let option = {
        new: false,
      };
      mongoose.model('questionForUsers').findOneAndUpdate(query, update, option, (err, done) => {
        if (err) throw err;
        if (done) {
          console.log('done', done)
          let link = '/question/' + done.user;
          res.redirect(link);
          next();
        }
      })
    }))
  })
})


module.exports = router;
