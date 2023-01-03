const express = require('express')
const GeneralRoute = express.Router()
const Email= require("../Models/EmailSchema")
const {newRegisterEmail} =require ('../Controllers/EmailsNewsletter')
const {mail} = require('../Controllers/EmailSend')
const {onApprove} = require('../Controllers/PayPal') 
const {onApproveShoppingCard} = require('../Controllers/PayPalCard') 
const {NewsLetterSend} = require('../Controllers/NewsLetterSend')
const {purchase_history}= require('../Controllers/Purchase_history') 
 
//# new email subscription
//  http://localhost:3004/NewsLetter
GeneralRoute.post('/NewsLetter',newRegisterEmail)  
GeneralRoute.post('/sendEmail',mail)
GeneralRoute.post('/onApprove',onApprove)
GeneralRoute.post('/onApproveShoppingCard',onApproveShoppingCard) 
GeneralRoute.post('/NewsLetterSend',NewsLetterSend)  

GeneralRoute.post("/purchase_history",purchase_history)

// GeneralRoute.post("/capture",capturePayment );
  



GeneralRoute.get("/PayPalClientID", (req, res) => {
  res.json({
    paypalClientId: process.env.CLIENT_ID,
  })
})


module.exports=GeneralRoute