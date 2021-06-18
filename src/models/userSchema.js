const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    role:String,
    price:String,
    status:String,
    image:String,
    phone:String,
    city:String,
    jobsDone:{
        type:Number,
        default:0
    },
    createdAt :{
        type:Date,
        default: Date.now
    }
});

const UserSchema = mongoose.Schema({
    name : String,
    email:String,
    password:String,
    profile:ProfileSchema,
    createdAt :{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user',UserSchema)
