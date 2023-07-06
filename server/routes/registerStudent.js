const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const student = require('../models/student');
router.post('/signup', (req, res) => {
    console.log(req.body);
    const newStudent = new student({
        email: req.body.email,
        name: req.body.name,
        department: req.body.department,
        password: bcrypt.hashSync(req.body.password, 10),
        skills: req.body.skills
    })
    newStudent.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'email in use'
            })
        }
        return res.status(200).json({
            title: 'signup success'
        })
    })
})
router.post('/login', (req, res) => {
    student.findOne({ email: req.body.email }, (err, user) => {
        console.log(user)
        console.log(req.body.password)
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            })
        }
        if (!bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({
                tite: 'login failed',
                error: 'invalid credentials'
            })
        }
        let studenttoken = jwt.sign({ userId: user._id }, 'secretkey');
        return res.status(200).json({
            title: 'login success',
            studenttoken: studenttoken
        })
    })
})
router.get('/user', (req, res) => {
    let studenttoken = req.headers.studenttoken;
    jwt.verify(studenttoken, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        })
        student.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)
            return res.status(200).json({
                title: 'user grabbed',
                student: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    department: user.department,
                    project: user.project,
                    skills: user.skills,
                    notifs: user.notifs,
                    requestsstatus: user.requestsstatus,
                    rejected: user.rejected,
                }
            })
        })

    })
})

module.exports = router;