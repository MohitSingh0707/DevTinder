const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
    },
    emailId:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    age:{
        type : Number,
        required : true
    },
    gender :{
        typr : String
    }
})
module.exports =  mongoose.model("User",userSchema);