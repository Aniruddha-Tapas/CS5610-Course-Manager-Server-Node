const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    title: String,
    points: Number,
    description: String,
    choices: [{
        text: String,
        value: String,
        correct: Boolean
    }],
    questionType: {
        type: String,
        enum: [
            'MULTIPLE_CHOICE',
            'FILL_BLANK',
            'TRUE_FALSE',
            'ESSAY',]
    }
}, {collection: 'question'});