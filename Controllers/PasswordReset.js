const { default: mongoose } = require("mongoose")
const User = require('../Models/UserSchema')
const Token = require('../Models/TokenSchema')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const {sendEmail} = require('./EmailValidation')


const PasswordReset = async(req,res)=>{
    const {Email} = req.body
    User.findOne({ Email: Email })
    .then(async(user) => {   
        if(!user){ res.send({msg:' wrong email address there is no user with this email'})}
        else {

       

        console.log(user) 
            let token = await new Token ({
                userId:user._id,
                token:crypto.randomBytes(32).toString('hex')
            }).save()
            const message = `for password reset click on the link for   ${process.env.BASE_URL}/Users/passwordMatchReset/${user._id}/${token.token}`

            let output = ` <h3> New request from ${user.username}</h3>
            <p>  ${message}  </p> 
            <p>  if you haven't requested just ignore it   </p>`
             sendEmail(user.Email,"verify email",output, message)
             res.send({user})

            }


            

        
    })

}




module.exports={PasswordReset}