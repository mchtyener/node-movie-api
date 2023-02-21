const express = require('express');
const router = express.Router();
const status = require('http-status-codes')

const Movie = require('../models/Movie')

router.post('/', function (req, res, next) {
    const movie = new Movie(req.body)
    const promise = movie.save();
    promise.then((data) => {
        res.json({
            data: data,
            status: status.OK,
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
            status: status.OK,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});

// movie detail
router.get('/top10', function (req, res, next) {
    const promise = Movie.find({}).limit(10).sort({imdb_score: -1});
    promise.then((data) => {
        if (!data)
            next({message: 'The movie was not found', code: status.NOT_FOUND})
        else
            res.json({
                data: data,
                status: status.OK,
            })
    }).catch((err) => {
        res.json(err)
    })
});


// movie detail
router.get('/:movie_id', function (req, res, next) {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((data) => {
        if (!data)
            next({message: 'The movie was not found', code: status.NOT_FOUND})
        else
            res.json({
                data: data,
                status: status.OK,
            })
    }).catch((err) => {
        res.json(err)
    })
});

router.put('/:movie_id', function (req, res, next) {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true}); //new dönüşten sonran en güncel halini veriyor
    promise.then((data) => {
        if (!data)
            next({message: 'The movie was not found', code: status.NOT_FOUND})
        else
            res.json({
                data: data,
                status: status.OK,
            })
    }).catch((err) => {
        res.json(err)
    })
});


router.delete('/:movie_id', function (req, res, next) {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {
        if (!movie)
            next({message: 'The movie was not found', code: status.NOT_FOUND})
        else
            res.json(status.OK)
    }).catch((err) => {
        res.json(err)
    })
});

router.get('/beetween/:start_year/end_year', function (req, res, next) {
    const {start_year, end_year} = req.params
    const promise = Movie.find({
        year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year)} //$gte büyük ve eşit  $lte küçük ve eşit
    })
    promise.then((data) => {
        if (!data)
            next({message: 'The movie was not found', code: status.NOT_FOUND})
        else
            res.json({
                data: data,
                status: status.OK,
            })
    }).catch((err) => {
        res.json(err)
    })
});


module.exports = router;
