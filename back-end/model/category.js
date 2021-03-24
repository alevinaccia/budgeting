const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
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
    },
    budget : {
        type : Boolean,
        default : false
    },
    budgetValue:{
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('category' , categorieSchema);