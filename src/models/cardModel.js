const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema( {
    cardNumber: {type:String,trim:true},
    cardType:{type:String,enum:["REGULAR","SPECIAL"],trim:true},
    customerName: {
        type: String,
        required: true,
        trim:true
    },
    status: {
        type: String,
        default:'ACTIVE' ,
        trim:true
    },
    vision :{type:String,trim:true},
   
    customerID:{type : String,ref:"Customer",trim:true}
  
}, { timestamps: true });

module.exports = mongoose.model('card', cardSchema)