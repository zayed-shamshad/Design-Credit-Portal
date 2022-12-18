const express = require('express');
const router = express.Router();
const student = require('../models/student');

router.get('/:studentid', (req, res) => {
    student.findById(req.params.studentid)
        .then(data => {
            res.json(data)
        }
        )
        .catch(err => {
            res.json({ message: err })
        }
        )
});
router.patch('/:studentid', (req, res) => {
    student.updateOne({ _id: req.params.studentid }, { $set: { name: req.body.name, email: req.body.email, department: req.body.department, project: req.body.project, requestsstatus: req.body.requestsstatus,notifs: req.body.notifs,skills:req.body.skills,rejected:req.body.rejected } })
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.json({ message: err });
        });
    console.log(req.body);
});

module.exports = router;