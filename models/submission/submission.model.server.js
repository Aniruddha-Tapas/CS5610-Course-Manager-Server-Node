const mongoose = require('mongoose');
const submissionSchema = require('./submission.schema.server');
const submissionModel = mongoose.model('SubmissionModel', submissionSchema);

submitQuiz = submission =>
    submissionModel.create(submission);

findAllSubmissions = () =>
    submissionModel.find();

findSubmissionById = id =>
    submissionModel.findById(id)
        .populate({
            path: 'quiz',
            populate: {path: 'questions'}
        })
        .exec();

findAllSubmissionsForStudent = studentId =>
    submissionModel.find({student: studentId})
        .populate({
            path: 'quiz',
            populate: {path: 'questions'}
        })
        .exec();

findAllSubmissionsForQuiz = quizId =>
    submissionModel.find({quiz: quizId});

let api = {
    submitQuiz,
    findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionById

};
module.exports = api;