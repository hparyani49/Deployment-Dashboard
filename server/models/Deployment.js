const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deploymentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    template: String,
    version: String,
    date: String
}, {
    collection: 'deployment'
})

module.exports = mongoose.model('deployment', deploymentSchema)
