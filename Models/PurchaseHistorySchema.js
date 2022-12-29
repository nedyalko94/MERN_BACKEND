const mongoose = require('mongoose')

const PurchaseSchema = mongoose.Schema({
    products:{type:Array},
    product_id:{type:String},
    user:{type:Object},
    user_id:{type:String},
    PaymentDetail:{type:Object},
    verifiedBuyer:{type:Boolean,
        default:true},
    verifiedBuyAt:{type:Date,default:Date.now()},
})

const PurchaseHistory = mongoose.model('purchases',PurchaseSchema)
module.exports = {PurchaseHistory}