const mongoose = require('mongoose')

const ProductVoteSchema = mongoose.Schema({
    product_id : {type:String},
    user_id:{type:String}, 
    vote:{type:String},
    verifiedBuyer:{type:Boolean, 
        default:false},
    verifiedBuyAt:{type:Date,default: Date.now()},
     voteAt:{
        type: Date,
        default: Date.now()
      }
    


})

const ProductVote = mongoose.model('vote',ProductVoteSchema)
module.exports = {ProductVote}