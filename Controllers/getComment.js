
const { default: mongoose } = require('mongoose')
const {Comments} = require('../Models/CommentsSchema')


const GetComment = (req,res)=>{
    
    const { id } = req.params
    // res.json({msg:"success"})
    Comments.find({product_id:id} ,(err,data)=>{
        if(err){res.json({msg:err})}
        // console.log(data)
        res.json({comment:data})
    })
    // console.log(id)
}


module.exports = {GetComment}