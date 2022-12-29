const { default: mongoose } = require("mongoose")
const User = require('../Models/UserSchema')
const Token = require('../Models/TokenSchema')
const bcryptjs = require('bcryptjs')


const User_Password_Update = async (req, res) => {
    console.log(req.body)
    // const {id} = req.params.id
    try {
        
    
    const password = req.body.password
    const Password2 = req.body.Password2
    if (!password == Password2) { res.send({ msg: 'password don\'t match ' }) }

    let user = await User.findOne({ _id: req.params.id })
    if (!user) { res.send({ msg: 'error User can\'t be found ' }) }
    else {
        const passwordHash = await bcryptjs.hash(password, 10)
        const Password2Hash = await bcryptjs.hash(Password2, 10)

        // user.update({_id:user._id},{password:passwordHash})
        await User.findByIdAndUpdate({ _id: user._id }, { Password2: Password2Hash, password: passwordHash })
        // ,{$set:{Password2:Password2Hash}}
        res.send({ msg: 'Password was updated' })
        console.log(passwordHash, Password2Hash)
       


    }
    console.log(user)
} catch (error) {
    res.send({msg:'error try again '})
        
}
}


module.exports = { User_Password_Update }