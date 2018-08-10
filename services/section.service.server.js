module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);
    app.delete('/api/section/:sectionId/enrollment/:enrollmentId', deleteEnrollment);

    const sectionModel = require('../models/section/section.model.server');
    const enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function createSection(req, res) {
        const section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function findSectionsForStudent(req, res) {
        const currentUser = req.session.currentUser;
        const studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            });
    }

    function findSectionsForCourse(req, res) {
        const courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function updateSection(req, res) {
        const sectionId = req.params.sectionId;
        const newSection = req.body;

        sectionModel.updateSection({_id: sectionId}, newSection)
            .then(function (section) {
                res.json(section)
            })
    }

    function enrollStudentInSection(req, res) {
        const sectionId = req.params.sectionId;
        const currentUser = req.session.currentUser;
        const studentId = currentUser._id;
        const enrollment = {
            student: studentId,
            section: sectionId,
            grade: 'A'
        };

        sectionModel
            .decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }

    function deleteEnrollment(req, res) {
        const enrollmentId = req.params.enrollmentId;
        const sectionId = req.params.sectionId;

        sectionModel
            .incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .deleteEnrollmentById({_id: enrollmentId})
            })
            .then(function (enrollment) {
                res.json(enrollment)
            })
    }

    function deleteSection(req, res) {
        const sectionId = req.params.sectionId;

        sectionModel.deleteSection(sectionId)
            .then(() => {
                    enrollmentModel.deleteEnrollments(sectionId)
                        .then(() => res.send())
                }
            )
    }
};