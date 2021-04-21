const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: null
    },
    type: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        max: 24,
        required: true
    },
    recursivePeriod: {
        type: String
    },
    nextAddition: {
        type: String
    },
    color: {
        type: String,
        default : '#fff'
    }
})

module.exports = mongoose.model('transaction', transactionSchema);