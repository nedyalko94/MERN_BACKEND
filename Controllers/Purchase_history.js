
const {PurchaseHistory}=require('../Models/PurchaseHistorySchema')


const purchase_history= (req,res)=>{
    const myHistory = req.body.user._id
    PurchaseHistory.find({user_id:myHistory},(err,data)=>{
        if(err){res.json({msg:'server error'})}else{
            res.json({result:data})
        }
        console.log(data)
    })
}  

module.exports = {purchase_history} 