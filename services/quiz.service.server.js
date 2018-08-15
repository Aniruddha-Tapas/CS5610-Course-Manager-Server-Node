module.exports = function (app) {
    createQuiz = (req, res) => {
        let quiz = req.body;
        quizModel.createQuiz(quiz)
            .then(quiz => res.json(quiz));
    };

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizzes()
            .then(quizzes => res.json(quizzes));
    };

    findQuizById = (req, res) => {
        quizModel.findQuizById(req.params.qId)
            .then(quiz => res.json(quiz));
    };

    updateQuiz = (req, res) => {
        let quiz = req.body;
        quizModel.updateQuiz(req.params.qId, quiz)
            .then(status => res.send(status));
    };

    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.qId)
            .then(status => res.send(status));
    };

    addQuestion = (req, res) => {
        quizModel.addQuestion(req.params.quizId, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    };

    createAnswers = questions => {
        let answers = [];
        questions.map(question => {
            switch (question.questionType) {
                case 'FILL_BLANKS':
                    answers.push({fillBlanksAnswer: question.fillBlanksAnswer});
                    break;
                case 'TRUE_FALSE':
                    answers.push({trueFalseAnswer: question.trueFalseAnswer});
                    break;
                case 'CHOICE':
                    answers.push({multipleChoiceAnswer: question.multipleChoiceAnswer});
                    break;
                case 'ESSAY':
                    answers.push({essayAnswer: question.essayAnswer});
                    break;
                default:
                    return answers;
            }
        });
        return answers;
    };

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qId', findQuizById);
    app.put('/api/quiz/:qId', updateQuiz);
    app.delete('/api/quiz/:qId', deleteQuiz);
    app.put('/api/quiz/:quizId/question/:questionId', addQuestion);

    let quizModel = require('../models/quiz/quiz.model.server');
};