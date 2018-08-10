const mongoose = require('mongoose');
const sectionSchema = mongoose.Schema({
    name: String,
    seats: Number,
    courseId: Number,
    students: [String]
}, {collection: 'section'});
module.exports = sectionSchema;