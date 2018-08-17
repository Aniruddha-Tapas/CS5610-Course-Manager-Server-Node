let mongoose = require('mongoose');
let submissionSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    answers: [{
        multipleChoiceAnswer: Number,
        fillBlanksAnswer: [],
        trueFalseAnswer: Boolean,
        essayAnswer: String,
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        }
    }],
    timestamp: Date
}, {collection: 'submission'});
module.exports = submissionSchema;