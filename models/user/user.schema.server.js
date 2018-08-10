const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    address: String,
    type: String,
    sections: [String]
}, {collection: 'user'});

module.exports = userSchema;