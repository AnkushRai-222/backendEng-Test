const customerModel = require('../models/customerModel')
const{validEmail,validMobile,ValidName,validDate} = require('../validator/validation')
var uuid = require('uuid-random')

const createcustomer = async function(req,res){
    try{

         const data = req.body

         if(Object.keys(data).length == 0){
            return res.status(400).send({status:false,message:"Request Body Can't be Empty"})
         }
         const {firstName,lastName,mobileNumber,DOB,emailId,address,customerID,status} = data;

         if(!firstName){
            return res.status(400).send({status:false,message:"firstName is required"})
         }
         if(!ValidName(firstName.trim())){
            return res.status(400).send({status:false,message:"firstName is only accepted in alphabet"})
         }
    
        if(!lastName){
            return res.status(400).send({status:false,message:"lastName is required"})
        }
        if(!ValidName(lastName.trim())){
            return res.status(400).send({status:false,message:"lastName is only accepted in alphabet"})
         }
       
        if(!mobileNumber){
            return res.status(400).send({status:false,message:"mobileNumber is required"})
        }
        if(!validMobile(mobileNumber)){
            return res.status(400).send({status:false,message:"phone number only in Indian Number"})  
        }

        const phoneRegistered = await customerModel.findOne({mobileNumber:mobileNumber});
        if(phoneRegistered){
            return res.status(400).send({status:false,message:"mobileNumberis already registered"})
        }
        
        if(!DOB){
         return res.status(400).send({status:false,message:"Date of birth is required"})
        }
        if(!validDate(DOB)){
         return res.status(400).send({status : false, message : "DOB  should be in valid format like YYYY-MM-DD"})
        }
        //checking email
         if(!emailId){
             return res.status(400).send({status:false,message:"email is required"})
         }
         if(!validEmail(emailId)){
            return res.status(400).send({status:false,message:"email is invalid"})
         }

         const emailRegistered = await customerModel.findOne({emailId:emailId});
         if(emailRegistered){
            return res.status(400).send({status:false,message:"email is already Registered"})
         }
    

        //checking address
        if (!address) {
            return res.status(400).send({status:false,message:"address is required"})
        }
        
        const generateUUID = uuid();
        data["customerID"] = generateUUID
        if(!status){
            return res.status(400).send({status:false,message:"status is required"})
        }
        if(status !="ACTIVE" && status != "INACTIVE"){
            return res.status(400).send({status:false,message:"status is only accepted has ACTIVE OR INACTIVE"})
        }

        const newUser = await customerModel.create(data);
        return  res.status(201).send({ status: true, message: `Customer created successfully`, data: newUser });
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const getCustomer = async function ( req,res){

    try{
        const fetchDetails = await customerModel.find({status:"ACTIVE"})
        if(fetchDetails.length == 0){return res.status(400).send({status : false, message : "No data exist"})}
        return res.status(200).send({status : true , message : "customer Details", data : fetchDetails})

    }
    catch(error){
        return res.status(500).send({message : error.message})
    }

}

const deleteCustomer = async function ( req,res){

    try{

         const customerId = req.params.customerId
       if(!customerId){
        return res.status(400).send({status : false, message : "customerId is required in Params"})
       }
       if(!uuid.test(customerId)){
        return res.status(400).send({status : false, message : "customerId is not valid"})
       }
       const findCustomerId = await customerModel.findOne({customerID:customerId})
       if(!findCustomerId){
        return res.status(400).send({status : false, message : "customerId is not present in db"})
       }
       if(findCustomerId.status == "INACTIVE"){
        return res.status(400).send({status : false, message : "customer is already deleted"})
       }

       const fetchDetails = await customerModel.findOneAndUpdate({customerID:customerId},{$set:{status:"INACTIVE"}},{new:true})
       if(!fetchDetails){return res.status(400).send({status : false, message : "No data exist"})}
        return res.status(200).send({status : true , message : "customer Deleted Succesfully"})

   

    }

    catch(error){
        return res.status(500).send({message : error.message})

    }
}

module.exports={createcustomer,getCustomer,deleteCustomer}