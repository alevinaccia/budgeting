const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    value : {
        type : Number,
        required : true,
        min : 0
    },
    date : {
        type : String, 
        required : true
    },
    category : {
        type : String,
        required : true
    },
    recursive : {
        type : Boolean,
        required : true
    },
    ammountToSave : {
        type : Number,
        required : true
    },
    type : {
        type : Boolean, 
        required : true
    }
})

module.exports = mongoose.model('transaction' , transactionSchema);