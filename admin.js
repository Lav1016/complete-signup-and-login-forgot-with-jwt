const mongoose = require('mongoose');
const validator = require('validator');
const emailvalidator = require("email-validator");
const passwordValidator =require('password-validator')
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        default: null
    },
    password: {
        type: String,
        // minlength: 8,
        // maxlength: 16,
        // trim: true,
        // required: true
    },
    phone:{
        type: Number,
        minlength:10,
    },
    
    email: {
        type: String,
        required: 'Please enter your email',
        index:{
            unique:true,
        }
       // trim: true,
        //lowercase:true,
        // validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
    },
    gender:{
        type:String
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
       },
  
    otp:{
        type: Number,
    },
       accessToken: {
        type: String
       },
       status:{
           type:String
       }
},
{timestamps: true}
);
module.exports = mongoose.model('Admin',adminSchema);