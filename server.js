const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/webdev-summer2-2018');
mongoose.connect('mongodb://aniruddhastapas:mlabpassword2@ds117422.mlab.com:17422/heroku_kzzblr5q')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://cs5610-whiteboard-client-ng.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send('Node Server Running...')
});

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    const name = req.params['name'];
    const value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);
}

require('./services/user.service.server')(app);
require('./services/section.service.server')(app);
require('./services/quiz.service.server')(app);
require('./services/question.service.server')(app);

app.listen(process.env.PORT || 3000);
