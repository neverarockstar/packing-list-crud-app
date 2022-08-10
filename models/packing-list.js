const mongoose = require('mongoose');
const packingListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('PackingItem', packingListSchema, 'lists');

