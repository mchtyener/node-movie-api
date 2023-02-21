const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie')

router.post('/', function (req, res, next) {
    const movie = new Movie(req.body)
    const promise = movie.save();
    promise.then((data) => {
        res.json({
            data: data,
            status: true,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});

//movie all list
router.get('/', function (req, res, next) {
    const promise = Movie.find();
    promise.then((data) => {
        res.json({
            data: data,
            status: true,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});

// movie detail
router.get('/:movie_id', function (req, res, next) {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((data) => {
        res.json({
            data: data,
            status: true,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});

router.put('/:movie_id', function (req, res, next) {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true}); //new dönüşten sonran en güncel halini veriyor
    promise.then((data) => {
        res.json({
            data: data,
            status: true,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});


module.exports = router;
