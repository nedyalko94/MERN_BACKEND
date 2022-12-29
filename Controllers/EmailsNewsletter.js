const { default: mongoose } = require("mongoose");
const Email  = require ('../Models/EmailSchema')

const newRegisterEmail = (req,res)=>{
    const {email} = req.body
    const newEmail = new Email(req.body)
    
    //! have to check if is valid email 
    Email.findOne({email:email})
    .then(data =>{
     if (!data ){
          newEmail.save()
          res.json({ msg:'thank you for your subscription '})
         } 
     else{
         res.json({ msg:'you have already subscribe'}) 
     }
    })  
 }


module.exports= {newRegisterEmail}