const passport=require('passport')
require('passport-local')


const login = (req, res, next) => {

    // console.log(req.body)
    passport.authenticate('local', (err, user, info) => { 
        console.log(err)
        console.log(user)
        console.log(info)
        if (err) {return res.status(400).json({msg:'wrong username or password'})}
        if (!user) { return res.status(400).json({ msg: 'wrong username or password' }) }
        if(user.confirm === false ) { return  res.json({msg:'please confirm your email'})}
        // if(user.confirm === false ) { console.log('please confirm your email')}
        else {
            req.logIn(user, (err) => {   
                if (err) {return res.json({msg:'wrong username or password'})}
                else{
                 return   res.json({ msg: 'successfully auth',user:user })
                }

               
                // console.log(res.json())

 
            })  
        } 
    })(req, res, next)  
}




module.exports={login}
