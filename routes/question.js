var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

findAnswer = (myAnswer, answerList, callback) => {
  return answerList.map(item => {
    if (item.answerName === myAnswer) {
      return callback(item.isAnswer);
    }
  });
};

router.get("/:id", function(req, res, next) {
  let query = {
    user: req.params.id,
    isDone: false
  };
  mongoose.model("users").findById(req.params.id, (err, result) => {
    if (err) throw err;
    if (result) {
      mongoose
        .model("questionForUsers")
        .findOne(query)
        .populate("questionID")
        .exec((err, question) => {
          if (err) throw err;
          if (question) {
            res.render("question", {
              question: question,
              questionID: question.questionID._id,
              title: "Dân ta sử ta",
              id: req.params.id
            });
            next();
          } else {
            let query = {
              user: req.params.id,
              isCorrect: true
            };
            mongoose
              .model("questionForUsers")
              .find(query, (err, point) => {
                if (err) throw err;
                mongoose
                  .model("users")
                  .findByIdAndUpdate(
                    req.params.id,
                    { point: point.length },
                    (err, user) => {
                      if (err) throw err;
                      if (user) {
                        res.render("doneAnswerQuestion", {
                          name: user.name,
                          point: point.length
                        });
                        next();
                      }
                    }
                  );
              });
          }
        });
    } else {
      res.redirect("/");
      next();
    }
  });
});

router.post("/:id", function(req, res, next) {
  mongoose.model("questions").findById(req.body.questionID, (err, result) => {
    if (err) throw err;
    if (result) {
      findAnswer(req.body.radio, result.answers, isCorrect => {
        console.log('result', result)
        let query = {
          user: req.params.id,
          questionID: req.body.questionID,
          isDone: false,
        };
        let update = {
          isDone: true,
          isCorrect: isCorrect
        };
        let option = {
          new: false
        };
        mongoose
          .model("questionForUsers")
          .findOneAndUpdate(query, update, option, (err, done) => {
            if (err) throw err;
            if (done) {
              console.log('done', done)
              let link = "/question/" + done.user;
              res.redirect(link);
              next();
            }
          });
      });
    }
  });
});

module.exports = router;
