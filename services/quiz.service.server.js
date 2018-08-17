module.exports = function (app) {

    let quizModel = require('../models/quiz/quiz.model.server');
    let submissionModel = require('../models/submission/submission.model.server');

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

    submitQuiz = (req, res) => {
        let quiz = req.body;
        let quizId = req.body._id;
        const current_user = req.session['currentUser'];
        const userId = current_user._id;

        let answers = req.body.questions;
        for(let a = 0 ; a < answers.length; a++)
        {
            answers[a].question = answers[a]._id;
        }

        let submission = {
            student: userId,
            quiz: quizId,
            answers: answers,
            timestamp: req.body.timestamp
        };
        console.log(submission);
        submissionModel.submitQuiz(submission)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    };

    findAllSubmissions = (req, res) =>
        submissionModel.findAllSubmissions()
            .then(response => res.json(response));

    findSubmissionById = (req, res) =>
        submissionModel.findSubmissionById(req.params.submissionId)
            .then(response => res.json(response));

    findAllSubmissionsForStudent = (req, res) =>
        submissionModel.findAllSubmissionsForStudent(req.session['currentUser']._id)
            .then(response => res.json(response));

    findAllSubmissionsForQuiz = (req, res) =>
        submissionModel.findAllSubmissionsForQuiz(req.params.quizId)
            .then(response => res.json(response));


    addQuestion = (req, res) => {
        quizModel.addQuestion(req.params.quizId, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    };

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.put('/api/quiz/:quizId', updateQuiz);
    app.delete('/api/quiz/:quizId', deleteQuiz);
    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/quiz/:quizId/submission', findAllSubmissionsForQuiz);
    app.get('/api/submission', findAllSubmissions);
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmissionById);
    app.get('/api/quiz/:quizId/student/:sid/submission', findAllSubmissionsForStudent);
    app.put('/api/quiz/:quizId/question/:questionId', addQuestion);

};