const cardmodel = require('../models/cardModel')
const customerModel = require('../models/customerModel')
var uuid = require('uuid-random')

const {ValidName } = require("../validator/validation")





const createCard = async function (req,res){

    try{

        let data = req.body

        const {cardNumber,cardType,customerName,status,vision,customerID} = data

        if (Object.keys(data).length == 0) { return  res.status(400).send({status : false, message : " Please Provide Some data"})}

        const cardCount = await cardmodel.find()
        data.cardNumber = "C00" + (cardCount.length + 1)
        if(!cardType){ return res.status(400).send({status : false , message : "Please Provide card type"})}
        if( cardType !="REGULAR" && cardType != "SPECIAL"){
            return res.status(400).send({status : false , message : "cardType only in REGULAR/SPECIAL"})  
        }
        if(!customerName){ return res.status(400).send ({ status : false, message : "Please Provide Customer Name"})}
        if(!ValidName(customerName.trim())){ return res.status(400).send ({ status : false, message : "Customer Name Shouils be in alphabet"})}
      
        if(!status) { return res.status(400).send ({ status : false, message : "Please give your card status"})}
        if(status !="ACTIVE" && status != "INACTIVE"){
            return res.status(400).send({status:false,message:"status is only accepted has ACTIVE OR INACTIVE"})
        }
        if(!vision){ return res.status(400).send ({ status : false, message : "Please Provide Customer Vision"})}

        if(!customerID){ return res.status(400).send ({ status : false, message : "Please Provide customerID"})}

        if(!uuid.test(customerID)){
            return res.status(400).send({status : false, message : "customerId is not valid"})
         }
           const findCustomerId = await customerModel.findOne({customerID:customerID,status:"INACTIVE"})
           if(!findCustomerId){
            return res.status(400).send({status : false, message : "customerId is not present in db"})
           }
        
        const create = await cardmodel.create(data)
      

        return res.status(201).send({status : true, message : "card created" , data : create})

    }

 catch(error){
     return res.status(500).send({status : false, message : error.message})
    }
}





const getCard = async function ( req,res){

    try{
        const fetchDetails = await cardmodel.find()
        if(fetchDetails.length == 0){return res.status(400).send({status : false, message : "No data exist"})}
        return res.status(200).send({status : true , message : "Card Details", data : fetchDetails})
    }

    catch(error){
        return res.status(500).send({message : error.message})

    }

}

module.exports = {getCard,createCard};