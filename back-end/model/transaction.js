const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    value : {
        type : Number,
        required : true,
        min : 0.1
    },
    date : {
        type : String, 
        required : true
    },
    category : {
        type : String,
        default : null
    },
    ammountToSave : {
        type : Number,
        required : true
    },
    type : {
        type : Boolean, 
        required : true
    },
    text : {
        type : String,
        max : 24,
        required : true
    },
    recursivePeriod : {
        type : String
    },
    nextAddition : {
        type : String
    }
})

module.exports = mongoose.model('transaction' , transactionSchema);