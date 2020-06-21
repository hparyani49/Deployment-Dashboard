const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    versions: Array
}, {
    collection: 'templates'
})

module.exports = mongoose.model('templates', templateSchema)
