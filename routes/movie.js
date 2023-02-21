const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie')

router.post('/', function (req, res, next) {
    const movie = new Movie(req.body)
    const promise = movie.save();
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
});

module.exports = router;
