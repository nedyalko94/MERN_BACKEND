const mongoose = require('mongoose')
const User = require('../Models/UserSchema')
// check

  const DeleteById =  async(req, res)=> {
    try {


        const { id } = req.params
       await User.findByIdAndDelete(id, req.body)

        const AllUsers =await User.find({})
            
                res.json({ 
                    msg:'user is deleted',
                    AllUsers: AllUsers
                })
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg:"server error delete" })
    }
}



 const DeleteAll =  async(req, res) =>{
    try {
       await User.deleteMany({})
       const AllUsers =await User.find({})
            
       res.json({ 
        msg:'all get deleted',
        AllUsers: AllUsers
    })
           

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "can't delete server error " })

    }

}

module.exports= {DeleteAll,DeleteById }