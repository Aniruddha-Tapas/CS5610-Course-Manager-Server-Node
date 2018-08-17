module.exports = app => {

    let questionModel = require('../models/question/question.model.server');

    createQuestion = (req, res) =>
        questionModel.createQuestion(req.body)
            .then(
                question => res.json(question),
                error => res.send(error));

    findAllQuestions = (req, res) =>
        questionModel.findAllQuestions()
            .then(question => res.json(question),
                error => res.send(error));

    findQuestionById = (req, res) =>
        questionModel.findQuestionById(req.params.quesId)
            .then(question => res.json(question),
                error => res.send(error));

    updateQuestion = (req, res) =>
        questionModel.updateQuestion(req.params['quesId'], req.body)
            .then(question => res.send(question));

    app.post('/api/question', createQuestion);
    app.get('/api/question', findAllQuestions);
    app.get('/api/question/:quesId', findQuestionById);
    app.put('/api/question/:quesId', updateQuestion);
};