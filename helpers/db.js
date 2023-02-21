const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

module.exports = () => {
    mongoose.connect('mongodb://localhost/movie-api');
    mongoose.connection.on('open', () => {
        console.log("MongoDb: Connect")
    })

    mongoose.connection.on('error', (err) => {
        console.log("MongoDb:" + err)
    })
    mongoose.Promise = global.Promise;
};
