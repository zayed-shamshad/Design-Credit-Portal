const express = require('express');
const router = express.Router();
const Projects = require('../models/project');

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
    const post = new Projects(req.body);
    console.log(post);
    post.save().then(data => {
        res.json(data);
        console.log("we are in routes/posts", data)
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

    console.log("body",req.body);
    console.log("params",req.params);
    Projects.updateOne({ _id: req.params.projectid }, { $set: { title: req.body.title, description: req.body.description, department: req.body.department, students: req.body.students, number: req.body.number, skills: req.body.skills, status: req.body.status, evaluationstatus: req.body.evaluationstatus, deliverables: req.body.deliverables } })
        .then(data => {
            console.log("req.params.projectid", _id);
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

module.exports = router;