const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema( {
    firstName: {type:String,required:true,trim:true},
    lastName: {type:String,trim:true},
    mobileNumber: {
        type: String,
        required: true,
        trim:true
    },
    DOB: {
        type: Date ,
        trim:true
    },
    emailId: {type:String,required:true,trim:true},
    address : {type:String,trim:true},
   
    customerID: {
        type:String,
        trim:true},
    status:{type:String,enum:["ACTIVE","INACTIVE"],trim:true}
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema)