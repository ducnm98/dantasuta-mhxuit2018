var mongoose = require("mongoose");

var users = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  point: {
    required: false,
    type: Number,
  },
})

var questions = mongoose.Schema({
  questionName: {
    required: true,
    type: String,
  },
  answers: [{
    answerName: {
      required: true,
      type: String,
    },
    isAnswer: {
      required: true,
      type: Boolean,
      default: false,
    }
  }]
})

var questionForUsers = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions'
  },
  isDone: {
    required: true,
    type: Boolean,
    default: false,
  },
  isCorrect: {
    required: true,
    type: Boolean,
    default: false,
  }
})

module.exports = {
  users: mongoose.model('users', users),
  questions: mongoose.model('questions', questions),
  questionForUsers: mongoose.model('questionForUsers', questionForUsers)
};
