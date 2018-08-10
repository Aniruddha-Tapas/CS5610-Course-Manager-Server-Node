const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1, type: 1});
}

function findUserById(userId) {
    return userModel.findOne(userId);
}

function findUserByUsername(user) {
    return userModel.findOne(user, {username: 1});
}

function update(id, newUser) {
    return userModel.updateOne(id, newUser)
}

const api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    update: update
};

module.exports = api;