const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        minlength:[4,"First name must be at least 4 characters long"],
        maxlength:[30,"First name cannot be more than 30 characters"]
    },
    lastName:{
        type : String,
        minlength:[4,"Last name must be at least 4 characters long"],
        maxlength:[20,"Last name cannot be more than 20 characters"]
    },
    emailId:{
        type : String,
        lowecase:true,
        trim : true, //trim extra white spaces
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID");
            }
        }
    },
    password:{
        type : String,
        required : true,
        minlength : [6,"Password must be at least 6 characters long"],
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not Strong enough");
            }
        }
    },
    age:{
        type : Number,
        required : true,
        min : [18,"Age must be at least 18"],
        max : [80,"Age must be at most 80"]
    },
    gender :{
        type : String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender must be male, female or other");
            }
        }
    },
    photoUrl :{
        type :String,
        default : "https://cdn.vectorstock.com/i/500p/46/76/gray-male-head-placeholder-vector-23804676.jpg",
        maxlength : [250,"Photo URL cannot be more than 250 characters"],
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL");
            }
        },
    },
    about :{
        type : String,
        default : "Hey there! I am using DevTinder!",
        maxlength : [100,"About cannot be more than 100 characters"]
    },
    skills:{
        type :[String],
        duplicates : false,
        minlength:[1,"Atleast one skill is required"],
        maxlength:[10,"Skills cannot be more than 10"]
        
    }
},{
    timestamps : true
})
module.exports =  mongoose.model("User",userSchema);