const mongoose = require("mongoose");

// mongodb Model
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min: 1,
        max : 255
    },
    email : {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    password : {
        type: String,
        required: true,
        min: 6,
        max: 500
    },
    created_at :{
        type: Date,
        default : Date.now
    }

})

module.exports = mongoose.model('User', userSchema)