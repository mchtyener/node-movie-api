const jwt = require('jsonwebtoken')
const status = require('http-status-codes')

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err) {
                res.json({
                    status: status.NOT_FOUND,
                    message: 'Failed to login token'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.json({
            status: status.NOT_FOUND,
            message: 'No token provided'
        })
    }
}
