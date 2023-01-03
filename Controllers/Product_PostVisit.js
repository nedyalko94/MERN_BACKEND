const {ProductVisit}= require('../Models/ProductVisitSchema')

const Visitation = async(req,res)=>{
    console.log(req.body)
   const product= req.body.product
    const visits =req.body.visits
    ProductVisit.findById()
}

module.exports={Visitation}