const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 5
    },
    password : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('user' , userSchema);