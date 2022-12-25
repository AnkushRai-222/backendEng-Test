const express = require("express")
const router = express.Router()
const customercontroller = require('../controllers/customerController')
const cardcontroller = require('../controllers/cardController')

router.post('/register',customercontroller.createcustomer)
router.get('/getCustomer',customercontroller.getCustomer)
router.delete('/customer/:customerId',customercontroller.deleteCustomer)

//.......................Card.............

router.post('/cardRegister',cardcontroller.createCard)
router.get('/getcard',cardcontroller.getCard)

module.exports=router