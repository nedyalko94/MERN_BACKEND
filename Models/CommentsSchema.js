const mongoose = require('mongoose')

const CommentsSchema = mongoose.Schema({
    product_id : {type:String},
    user_id:{type:String},
    username:{type:String},
    comment:{type:String},
    child_of:{type:String},
    verifiedBuyer:{type:Boolean,
        default:false},
    verifiedBuyAt:{type:Date},
     CommentAt:{
        type: Date,
        default: Date.now()
      },
      Last_Update:{type:Date,default:null}


})

const Comments = mongoose.model('comments',CommentsSchema)
module.exports = {Comments}