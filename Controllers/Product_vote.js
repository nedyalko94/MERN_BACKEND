const { ProductVote } = require("../Models/ProductVoteSchema")
const Product = require('../Models/ProductSchema')
const User = require('../Models/UserSchema')

const Product_vote = async(req,res)=>{
 const product = req.body.product
const user = req.body.user
const voteValue = req.body.value

const obj = { 
    product_id:product._id,
    user_id:user._id,
    vote:voteValue


}
 
ProductVote.find({product_id:product._id},(err,data)=>{
    if(err){res.json({msg:'server error'})}
    if(data.length === 0){
         Product.findById({_id:product._id},async(err,result)=>{
            if (err){ console.log(err);}
            else{ 
                let totalVotePeople = result.NumberOfVote +1
                // need better formula/algorithm this one is not good/ wrong 
                let voteResult =result.Rating ==0? voteValue:(result.Rating * result.NumberOfVote+voteValue )/totalVotePeople
                console.log(voteResult)
                //
               await Product.findByIdAndUpdate({_id:product._id},{NumberOfVote:totalVotePeople,Rating:voteResult})
                // .toFixed(1) in front end otherwise here cause bug 
            } 
         })
         
        const newVote = new ProductVote(obj)
        newVote.save()
       
        res.json({result:data,msg:'vote is save'}
            
            
            )}
    else if(data.length > 0){
        ProductVote.find({ user_id:user._id}, (err,data)=>{
            if(data.length === 0){
                const newVote = new ProductVote(obj)
                newVote.save()
                res.json({result:data,msg:'vote already exist from another user this is add as well'})
                console.log(newVote)

            }else{

                res.json({result:data,msg:'already register from same user and product don\'t get save'})
                console.log(data)

            }
            
        })
       
    }
 

}) 



} 
   
module.exports={Product_vote}









