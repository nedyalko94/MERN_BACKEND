const {Comments} = require('../Models/CommentsSchema')
const {PurchaseHistory}=require('../Models/PurchaseHistorySchema')


const CreateComment = async(req,res)=>{
    // console.log(req.body)
    const verifiedBuyer = {
           product_id: req.body.product_id,
           user_id: req.body.user_id,   
           username: req.body.username,
           comment: req.body.comment,
           child_of: req.body.child_of,
           verifiedBuyer:true,
           Last_Update:req.body.Last_Update?req.body.Last_Update:null
        }
        if(req.body.user_id !== ''){
            PurchaseHistory.find({user_id:req.body.user_id},(err,data)=>{
                // console.log(data)
                if(err){console.log(err)}
                if(data.length>0){
                    PurchaseHistory.find({product_id:req.body.product_id},(err,data)=>{
                        if(err){console.log(err)}
                        if(data.length>0){
                            const comment = new Comments(verifiedBuyer)
                            comment.save() 
                        }else{
                            const comment = new Comments(req.body)
                            comment.save()
                        }
                    }) 
                }else{
                    const comment = new Comments(req.body)
                    comment.save()
                }

            })
        }else{
            const comment = new Comments(req.body)
            comment.save() 
        }
    // const comment = new Comments(req.body)
    // comment.save()
    const { id } = req.params
    // res.json({msg:"success"})
    Comments.find({product_id:id} ,(err,data)=>{
        if(err){res.json({msg:err})}
        // console.log(data)
        res.json({comment:data})
    })
}


module.exports = {CreateComment}