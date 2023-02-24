const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const status = require('http-status-codes')

const Director = require('../models/Director')

router.post('/', function (req, res, next) {
    const director = new Director(req.body)
    const promise = director.save();
    promise.then((data) => {
        res.json({
            data: data,
            status: status.OK,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});

router.get('/', function (req, res, next) {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies', // movies tablosundan
                localField: '_id', //directior tablosun da bulunan  _id al
                foreignField: 'director_id', //movie tablosun da bulunan director_id ile eşleştir
                as: 'movies', // dönen datayı buraya aktar
            }
        },
        {
            $unwind: {
                path: '$movies', // yukarıda atanan değişkenden veriyi al
                preserveNullAndEmptyArrays: true // boş gelenleride getir
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json({
            data: data,
            status: status.OK,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});

router.get('/:direction_id', function (req, res, next) {
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.direction_id)
            }
        },
        {
            $lookup: {
                from: 'movies', // movies tablosundan
                localField: '_id', //directior tablosun da bulunan  _id al
                foreignField: 'director_id', //movie tablosun da bulunan director_id ile eşleştir
                as: 'movies', // dönen datayı buraya aktar
            }
        },
        {
            $unwind: {
                path: '$movies', // yukarıda atanan değişkenden veriyi al
                preserveNullAndEmptyArrays: true // boş gelenleride getir
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json({
            data: data,
            status: status.OK,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});


module.exports = router;
