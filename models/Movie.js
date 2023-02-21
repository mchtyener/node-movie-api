const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    direction_id: Schema.Types.ObjectId,
    title: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    year: {
        type: Number,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    imdb_score: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('movie', MovieSchema)
