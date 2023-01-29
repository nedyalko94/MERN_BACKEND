const mongoose = require('mongoose')
const User = require('../Models/UserSchema')
const bcryptjs = require('bcryptjs')
const Token = require('../Models/TokenSchema')
const crypto = require('crypto')
const { sendEmail } = require('./EmailValidation')

const register = async(req, res) => {
 
    console.log(req.body)
    const { username, password, Password2, Email, FirstName, LastName, Gender, Country, City, PostCode, Street, NumberOfStreet } = req.body
    let err = []
    let success = []

    // check req field 
    if (!username || !password || !Password2 || !Email || !FirstName || !LastName || !Gender || !Country || !City || !PostCode || !Street || !NumberOfStreet) {
        err.push({ msg: 'please filed all fields' })
    }
    // check password match
    if (password !== Password2) { err.push({ msg: 'Password do not match' }) }

    // check pass length
    if (password.length < 8) {
        err.push({ msg: 'Password must be at least 8 characters' })
    }
    // email check
    if (Email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g) === null ) {
        err.push({ msg: 'Invalid Email' })
    }
    // check pass A-Z 0-9 special char 
    if ( password.match(/[A-Z]/g) === null  
    || password.match(/[0-9]/g)  === null 
    || password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g) === null ) {
        err.push({ msg: 'Password must includes , number 1-9,  upper case A-Z, and special character ' }) 
    }
 
    if (err.length > 0) {
        res.status(500).json({ msg: err }) 


    } else{
 
        User.findOne({ Email: Email }) 
            .then(async(result) => {
                if (result !== null) {
                    
                    err.push({ msg: 'email is already register' })
                    res.status(500).json({ msg: err })

 
                } else {
                 
                    const newUser =  new User({ 
                        username, 
                        Email, 
                        password, 
                        Password2,
                        FirstName, 
                        LastName,
                        Gender,
                        Country,
                        City,
                        PostCode,
                        Street, 
                        NumberOfStreet,  
                    })

                        

                    // hash password 
                    bcryptjs.genSalt(10, (err, salt) => {
                        bcryptjs.hash((newUser.password,newUser.Password2), salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            newUser.Password2 = hash
                            newUser.save()
                            
                                .catch(err => {
                                    console.log(err)
                                })
 
                        })

                    }) 
                    let token = await new Token ({
                        userId:newUser._id,
                        token:crypto.randomBytes(32).toString('hex')
                    }).save()
                    const message = ` click on the link to verify your email ${process.env.SERVER_URL}/Users/verify/${newUser._id}/${token.token}`

                    let output = ` <h3> new registration ! 
                    <ul>
                    <li> <h3> Name : ${newUser.username} </h3></li>
                    <li> <h3> Email: ${newUser.Email} </h3> </li>

                    </ul>  

                    <p> ${message} </p>`
                    let success = [{ message: 'register was success now you can confirm your email' }]
                  
                    
                        res.status(200).json({ msg: success })
                        await  sendEmail(newUser.Email,"verify email",output, message)  
    
                    // }
                    
                }
                
            }
            )
        }       
    
} 

module.exports={register}
