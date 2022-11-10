const express = require('express');
const router = express.Router();
const Projects = require('../models/post');

router.get('/:projectid', (req, res) => {
    Projects.findById(req.params.projectid)
        .then(data => {
            res.json(data)
        }
        )
        .catch(err => {
            res.json({ message: err })
        }
        )
});

router.post('/', (req, res) => {
    const post = new Projects({
        title: req.body.title,
        description: req.body.description,
        number: req.body.number,
        professor: req.body.professor,
        students: req.body.students,
        status: req.body.status,
        skills: req.body.skills,
        department: req.body.department,
        deliverables: req.body.deliverables
    });

    post.save().then(data => {
        res.json(data);
        console.log("we are in routes/posts",data)
    }).catch(err => {
        res.json({ message: err });
    });
});
router.delete('/:projectid', (req, res) => {
    Projects.remove({ _id: req.params.projectid })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });

});
router.patch('/:projectid', (req, res) => {
    Projects.updateOne({ _id: req.params.projectid }, { $set: { title: req.body.title, description: req.body.description, department: req.body.department, students: req.body.students, number: req.body.number, skills: req.body.skills, status: req.body.status, evaluationstatus: req.body.evaluationstatus, deliverables: req.body.deliverables } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
    console.log(req.body);
});

module.exports = router;