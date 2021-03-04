const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    role:String,
    price:String,
    status:String,
    image:String,
    phone:String,
    city:String,
    createdAt :{
        type:Date,
        default: Date.now
    }
});

const UserSchema = mongoose.Schema({
    name : String,
    email:String,
    password:String,
    role:String,
    profile:ProfileSchema,
    createdAt :{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user',UserSchema)
