const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLSchema = new Schema({
    compeleted_URL: {
        type: String,
        require: true
    },
    shorten_URL: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('WebAddress', URLSchema)