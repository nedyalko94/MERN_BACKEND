const mongoose = require('mongoose')
const User = require('../Models/UserSchema')
// check

  const DeleteById = function (req, res) {
    try {


        const { id } = req.params
        User.findByIdAndDelete(id, req.body)
            .then(result => {
                res.json({ 
                    msg:'user is deleted',
                    data: result
                })
            })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg:"server error delete" })
    }
}



 const DeleteAll =  function (req, res) {
    try {
        User.deleteMany({})
            .then(result => {
                res.json({
                    message: 'all get deleted ! ',
                    data: result

                })
            })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "can't delete many " })

    }

}

module.exports= {DeleteAll,DeleteById }