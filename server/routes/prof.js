const express = require('express');
const router = express.Router();
const prof = require('../models/prof');
router.get('/:profid', (req, res) => {
    prof.findById(req.params.profid)
        .then(data => {
            res.json(data)
        }
        )
        .catch(err => {
            res.json({ message: err })
        }
        )
});
// router.post('/', (req, res) => {
//     const post = new prof({
//         name: req.body.name,
//         email: req.body.email,
//         department: req.body.department,
//         projects: req.body.projects,
//         notifs: req.body.notifs
//     });
//     post.save().then(data => {
//         res.json(data);
//     }).catch(err => {
//         res.json({ message: err });
//     });
//     console.log(req.body);
//     console.log(post);
// });
router.patch('/:profid', (req, res) => {
    prof.updateOne({ _id: req.params.profid }, { $set: { name: req.body.name, email: req.body.email, department: req.body.department, projects: req.body.projects, notifs: req.body.notifs } })
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.json({ message: err });
        });
    console.log(req.body);
});
module.exports = router;