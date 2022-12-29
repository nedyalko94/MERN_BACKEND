const mongoose = require('mongoose')

const EmailSchema = mongoose.Schema({
email:
{
    type:String,
    // unique:true,
    // require:true,
 
}
})

const Email = mongoose.model ('emails',EmailSchema)
module.exports= Email