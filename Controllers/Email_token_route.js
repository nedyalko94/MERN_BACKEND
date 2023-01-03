

// const mongoose = require('mongoose')
const User = require('../Models/UserSchema')
const Token = require('../Models/TokenSchema')

const emailLink = async(req,res)=>{
    try {
        // find the user
        let user = await User.findOne({_id: req.params.id})
        if(!user) return res.status(400).send('user don\'t exist')
        //find and check for token
        const token  = await Token.findOne({userId: user._id,token: req.params.token})
        if(!token) return res.status(400).send('problem with finding token ')
    
        
        // update the user
         await User.findByIdAndUpdate({_id:user._id},{confirm:true}) 

         // delete the token 
        await Token.findByIdAndRemove(token._id) 

        //redirect the user
         res.redirect(`${process.env.CLIENT_URL}/ThankYou`)
        
        // setTimeout(res.redirect('http://localhost:3000/') ,100000 ) 
         
      
    } catch (error) {
        
        res.status(400).send('error in get request with token or user',console.log(error))
    
    }
    }

    module.exports = {emailLink}