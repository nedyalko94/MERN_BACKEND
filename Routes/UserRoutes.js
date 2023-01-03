const express = require('express')
const UserRouter = express.Router()
const { UserHome, UserNotFound, NewUser, findUserByUserNameOrName } = require('../Controllers/UserController')
const User = require('../Models/UserSchema')
const {uploader} =require('../Middleware/ProductMiddleware')

//CRUD User
const {register}= require('../Controllers/User_register')
const {login}= require('../Controllers/User_login')
const {getUser}= require('../Controllers/User_get')
const {logout}= require('../Controllers/User_logout')
const {DeleteAll,DeleteById} = require('../Controllers/User_delete')
const {emailLink} = require('../Controllers/Email_token_route')
const {PasswordReset}= require('../Controllers/PasswordReset')
const {PasswordMatchReset} = require('../Controllers/PasswordMatchReset')
const {User_Password_Update}= require('../Controllers/User_Password_Update')
const {User_Info_Update} = require('../Controllers/User_Info_Update')


const {authUser} = require('../Config/basicAuth')

// for delete later after move my bcryptjs connect-flash  and session

// const bcryptjs = require('bcryptjs')
// const passport = require('passport')
const { ensureAuthenticated } = require('../Config/auth')

UserRouter.put('/Update/:id',User_Info_Update)

UserRouter.put('/Password_Update/:id',User_Password_Update)

// password reset post // send email for reset 
UserRouter.post('/passwordReset',PasswordReset)

// route for password reset from  email link
UserRouter.get('/passwordMatchReset/:id/:token',PasswordMatchReset)

//add user (register)
UserRouter.post('/AddUser', NewUser)
//http://localhost:3004/Users/AddUser

UserRouter.get('/', UserHome)
//http://localhost:3004/Users/

//deleteById
UserRouter.delete('/Delete/:id', DeleteById)
//http://localhost:3004/Users/Delete/id

//Delete all of them 
UserRouter.delete('/DeleteAll', DeleteAll)
//http://localhost:3004/Users/DeleteAll


//register handle 
UserRouter.post('/register',register )
//http://localhost:3004/Users/register
 

// login handle
UserRouter.post('/login',login )  
//http://localhost:3004/Users/login



// get user after log in 
UserRouter.get('/user', getUser )
//http://localhost:3004/Users/user

// logout handle

 UserRouter.get('/logout',logout) 

 //user  find handler
UserRouter.get('/FindUser',findUserByUserNameOrName)
//http://localhost:3004/Users/findUser?username=gogo3 
//http://localhost:3004/Users/findUser?email=gmail
//http://localhost:3004/Users/findUser?firstname=Drago
//http://localhost:3004/Users/findUser?lastname=Biden
//http://localhost:3004/Users/findUser?gender=female
//http://localhost:3004/Users/findUser?country=Spain
//http://localhost:3004/Users/findUser?city=Brussel
//http://localhost:3004/Users/findUser?postcode=1





// link for verify email
UserRouter.get('/verify/:id/:token',emailLink)

UserRouter.get('*', UserNotFound)

module.exports = UserRouter






// passport login 



// (req, res, next) => {

//      console.log(req.body)
//     passport.authenticate('local', (err, user, info) => { 
//         console.log(err)
//         console.log(user)
//         console.log(info)
//         if (err) throw err
//         if (!user) { res.send({ msg: '  fail  auth ' }) }
//         else {
//             req.logIn(user, (err) => {
//                 if (err) throw err

//                 res.json({ msg: 'successfully auth',user:user }) 
//                  console.log(req.user)


//             })
//         }
//     })(req, res, next) 
// }




// UserRouter.post('/EmailValidation',async(req,res)=>{
//     try {
//         let user = await User.findOne({Email:req.body.Email})
//         if(user) return res.status(400).send('email already exist ')
//         user = await new User({
//             username:req.body.username,
//             Email:req.body.Email,
//             password:req.body.password,
//             Password2:req.body.Password2,
//             FirstName:req.body.FirstName,
//             LastName:req.body.LastName,
//             Gender:req.body.Gender,
//             Country:req.body.Country,
//             City:req.body.City,
//             PostCode:req.body.PostCode,
//             Street:req.body.Street,
//             NumberOfStreet:req.body.NumberOfStreet,

//         }).save()
//         let token =  await new Token ({
//             userId:user._id,
//             token:crypto.randomBytes(32).toString('hex')
//         }).save()
//         const message = `${process.env.BASE_URL}/Users/verify/${user._id}/${token.token}`
//         await sendEmail(user.Email,"verify email", message)
//         res.send('email send to your acc pls verify')
//     } catch (error) {
//         res.status(400).send('ann error in route ')
        
//     }
// })