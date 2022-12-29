const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tokenSchema =  new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'user',
        unique:true,
    },
    token:{type:String,require:true},
    createAt:{type :Date , default: Date.now(), expires:3600}  // 1 hour for expire


 
})

module.exports= mongoose.model('token',tokenSchema)