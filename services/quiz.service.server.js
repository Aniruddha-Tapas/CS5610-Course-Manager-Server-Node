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
        quizModel.findQuizById(req.params.quizId)
            .then(quiz => res.json(quiz));
    };

    updateQuiz = (req, res) => {
        let quiz = req.body;
        quizModel.updateQuiz(req.params.quizId, quiz)
            .then(status => res.send(status));
    };

    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.quizId)
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

    submitQuiz = (req, res) => {
        let quiz = req.body;
        let answers = this.createAnswers(quiz.questions);
        let submission = {
            student: req.session['currentUser']._id,
            quiz: req.params.quizId,
            answers: answers
        };
        submissionModel.submitQuiz(submission)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    };

    findAllSubmissions = (req, res) =>
        submissionModel.findAllSubmissions()
            .then(response => res.json(response));

    findAllSubmissionsForStudent = (req, res) =>
        submissionModel.findAllSubmissionsForStudent(req.session['currentUser']._id)
            .then(response => res.json(response));

    findSubmissionById = (req, res) =>
        submissionModel.findSubmissionById(req.params.submissionId)
            .then(response => res.json(response));


    findAllSubmissionsForQuiz = (req, res) =>
        submissionModel.findAllSubmissionsForQuiz(req.params.quizId)
            .then(response => res.json(response));

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.put('/api/quiz/:quizId', updateQuiz);
    app.delete('/api/quiz/:quizId', deleteQuiz);
    app.put('/api/quiz/:quizId/question/:questionId', addQuestion);
    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/quiz/:quizId/submission', findAllSubmissionsForStudent);
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmissionById);
    app.get('/api/submission', findAllSubmissions);
    app.get('/api/submission/:quizId', findAllSubmissionsForQuiz);

    let quizModel = require('../models/quiz/quiz.model.server');
    let submissionModel = require('../models/submission/submission.model.server');
};