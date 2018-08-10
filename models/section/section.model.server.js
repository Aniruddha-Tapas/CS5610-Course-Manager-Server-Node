const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');
const sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findAllSections() {
    return sectionModel.find();
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function updateSection(id, newSection) {
    return sectionModel.updateOne(id, newSection)
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function deleteSection(sectionId) {
    return sectionModel.remove({_id: sectionId})
}

module.exports = {
    createSection: createSection,
    findAllSections: findAllSections,
    findSectionsForCourse: findSectionsForCourse,
    updateSection: updateSection,
    incrementSectionSeats: incrementSectionSeats,
    decrementSectionSeats: decrementSectionSeats,
    deleteSection: deleteSection
};