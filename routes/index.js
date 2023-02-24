const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User")
const status = require("http-status-codes");
const jwt = require('jsonwebtoken')

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/register', function (req, res, next) {

    const {username, password} = req.body
    const user = new User({
        username: username, password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_KEY).toString()
    })
    const promise = user.save();

    promise.then((data) => {
        res.json({
            data: data, status: status.OK,
        })
    }).catch((err) => {
        res.json({message: err.message})
    })
});


router.post('/login', function (req, res, next) {

    const {username, password} = req.body
    User.findOne({
        username
    }, (err, data) => {
        if (err) {
            res.json({
                status: false, message: err
            })
        }
        if (!data) {
            res.json({
                status: status.NOT_FOUND, message: 'Login failed, User not found'
            })
        } else {
            if (password !== CryptoJS.AES.decrypt(data.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)) {
                res.json({
                    status: status.NOT_FOUND, message: 'Login failed, wrong password'
                })
            } else {
                const payload = {
                    username
                }
                const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                    expiresIn: 720
                })

                res.json({
                    status: status.OK,
                    token,
                    data: {
                        username,
                        id: data._id
                    }
                })
            }
        }
    })

});

module.exports = router;
