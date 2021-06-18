const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    spId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    phone:String,
    address:String,
    offerRate:String,
    status:{type:String,default:'panding'},
    createdAt:{type:Date,default:Date.now}

})

module.exports = mongoose.model('offer',OfferSchema);