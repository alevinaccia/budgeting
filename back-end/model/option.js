const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    creatorId : {
        type : String,
        required : true
    },
    color : {
        type : String,
    },
    value: {
        type : Number,
        default : 1,
    }
})

module.exports = mongoose.model('option' , optionSchema);