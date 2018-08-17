const mongoose = require('mongoose');
const questionSchema = require('./question.schema.server');
const questionModel = mongoose.model('QuestionModel', questionSchema);

createQuestion = question =>
    questionModel.create(question);

findAllQuestions = () =>
    questionModel.find();

findQuestionById = quesId =>
    questionModel.findById(quesId);

updateQuestion = (quesId, question) =>
    questionModel.update({_id: quesId},
        {
            $set: question
        })

let api = {
    createQuestion,
    findAllQuestions,
    findQuestionById,
    updateQuestion
};

module.exports = api;