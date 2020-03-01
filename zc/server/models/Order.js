const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    user: { type: String },
    date: { type: String },
    train: { type: String },
})
module.exports = mongoose.model('Order', schema)