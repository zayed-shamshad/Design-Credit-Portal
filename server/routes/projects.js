const express = require('express');
const router = express.Router();
const Post = require('../models/project');
router.get('/', (req, res) => {
    Post.find({})
        .then(data => {
            res.json(data)
        }
        )
        .catch(err => {
            res.json({ message: err })
        }
        )
});
router.get('/dept/:dept', (req, res) => {
    Post.find({ "department": req.params.dept })
        .then(data => {
            res.json(data)
        }
        )
        .catch(err => {
            res.json({ message: err })
        }
        )
});
router.get('/professor/:prof', (req, res) => {
    Post.find({ "professor": req.params.prof })
        .then(data => {
            res.json(data)
        }
        )
        .catch(err => {
            res.json({ message: err })
        }
        )
});
module.exports = router;