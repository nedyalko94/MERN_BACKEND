const User = require ('../Models/UserSchema')
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')

// const passport = require('passport') not need it because passport is in the function 
const localStrategy = require('passport-local').Strategy

module.exports =function(passport){

    passport.use( 
        new localStrategy ((username, password, done)=>{
            
            User.findOne({username:username},(err,user)=>{
                
                if(err) throw err  
                if(!user){
                    return done (null,false)
                }
                else {
                    bcryptjs.compare( password,user.password,(err,result)=>{

                        if (err) throw err 
                        if ( result ===true){
                            return done( null, user)
                        }
                        else {
                            return done ( null, false )

                        }
                    })
                } 
            })
        })
    )
passport.serializeUser ( (user,cb)=>{
    cb(null,user.id)

})
passport.deserializeUser((id,cb)=>{
    User.findOne({_id:id},(err,user)=>{
        cb(err,user)
    })
})

}