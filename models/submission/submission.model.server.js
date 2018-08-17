const mongoose = require('mongoose');
const submissionSchema = require('./submission.schema.server');
const submissionModel = mongoose.model('SubmissionModel', submissionSchema);

submitQuiz = submission =>
    submissionModel.create(submission);

findAllSubmissions = () =>
    submissionModel.find();

findSubmissionById = id =>
    submissionModel.findById(id)
        .populate('answers')
        .populate('answers.question')
        .populate('student')
        .populate('quiz')
        .exec();

findAllSubmissionsForStudent = studentId =>
    submissionModel.find({student: studentId})
        .populate('answers')
        .populate('student')
        .populate('quiz')
        .exec();

findAllSubmissionsForQuiz = quizId =>
    submissionModel.find({quiz: quizId})
        .populate('answers')
        .populate('student')
        .populate('quiz')
        .exec();

let api = {
    submitQuiz,
    findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionById

};
module.exports = api;