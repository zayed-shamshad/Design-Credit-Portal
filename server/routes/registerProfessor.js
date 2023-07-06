const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prof = require('../models/prof');

router.post('/signup', (req, res) => {
    const newprof = new prof({
        email: req.body.email,
        name: req.body.name,
        department: req.body.department,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    newprof.save(err => {
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
    prof.findOne({ email: req.body.email }, (err, user) => {
        console.log(user)
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
        let professortoken = jwt.sign({ userId: user._id }, 'secretkey');
        return res.status(200).json({
            title: 'login success',
            professortoken: professortoken
        })
    })
})

router.get('/user', (req, res) => {
    let professortoken = req.headers.professortoken;
    jwt.verify(professortoken, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        })
        prof.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)
            console.log("server", user)
            return res.status(200).json({
                title: 'prof found',
                prof: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    department: user.department,
                    projects: user.projects,
                    notifs: user.notifs
                }
            })
        })

    })
})

module.exports = router;