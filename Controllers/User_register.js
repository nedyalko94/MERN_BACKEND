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
    if (err.length > 0) {
        res.status(500).json({ msg: err })

        // ,{ err,UserName,Password, Password2 ,Email , FirstName, LastName, Gender,Country,City,PostCode,Street}

    } else {
        User.findOne({ Email: Email })
            .then(async(result) => {
                if (result !== null) {
                    // console.log("🚀check result", result)

                    // user exist  
                    err.push({ msg: 'email is already register' })

                    console.log("🚀 ~ file: UserRoutes.js ~ line 60 ~ UserRouter.post ~ err", err)
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
                    const message = ` click on the link to verify your email ${process.env.BASE_URL}/Users/verify/${newUser._id}/${token.token}`

                    let output = ` <h3> New Guest email from ${newUser.FirstName}</h3>
                    <ul>
                    <li> <h3> Name : ${newUser.username} </h3></li>
                    <li> <h3> Email: ${newUser.Email} </h3> </li>

                    </ul>

                    <p> ${message} </p>`
                     sendEmail(newUser.Email,"verify email",output, message)
                    // res.send('email send to your acc pls verify')
                }
            })

            // res.status(500).json({msg:err})
            .then(() => {
                let success = [{ message: 'register was success now you can confirm your email' }]
                if (err.length > 0) {
                    res.status(500).json({ msg: err })
                }
                else {
                    res.status(200).json({ msg: success })
                    // req.flash('success_msg','you are now register')

                    // res.location('http://localhost:3004/')
                    // res.redirect('/Users/login')

                    //http://localhost:3004/Users/login
                    //is not in array
                }
            })


    }
}

module.exports={register}