const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User")
const status = require("http-status-codes");

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/register', function (req, res, next) {

    const {username, password} = req.body
    const user = new User({
        username: username,
        password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_KEY).toString()
    })
    const promise = user.save();

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
