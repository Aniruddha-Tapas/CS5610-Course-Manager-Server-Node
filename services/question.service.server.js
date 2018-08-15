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

    app.get('/api/question', findAllQuestions);
    app.post('/api/question', createQuestion);
};