
const User = require('../Models/UserSchema')
const Token = require('../Models/TokenSchema')

const PasswordMatchReset = async(req, res)=>{
    try {
        let user = await User.findOne({_id: req.params.id})
        if(!user) return res.status(400).send('user don\'t exist')
        const token  = await Token.findOne({userId: user._id,token: req.params.token})
        if(!token) return res.status(400).send(' wrong request no token found ')
    
        // await User.updateOne({id:user._id,confirm:true})
      
    
    //    let test=   await User.updateOne({id:user._id,confirm:true}) 
        //  await User.findByIdAndUpdate({_id:user._id},{FirstName:"passwordChange"}) 
         res.redirect(`http://localhost:3000/PasswordUpdate/${user._id}`)
        
         await Token.findByIdAndRemove(token._id) 

        // setTimeout(res.redirect('http://localhost:3000/') ,100000 ) 
         
      
    } catch (error) {
        
        res.status(400).send('error in get request with token or user',console.log(error))
}
}

module.exports = {PasswordMatchReset}