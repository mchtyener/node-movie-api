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


module.exports = router;
