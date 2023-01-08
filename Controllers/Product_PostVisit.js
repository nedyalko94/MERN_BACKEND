const {ProductVisit}= require('../Models/ProductVisitSchema')

const Visitation = async(req,res)=>{
   const product= req.body.product

   ProductVisit.findOne({product_id:req.body.product_id},async(err,data)=>{
    if (err){
        console.log(err)
    }
    if( data === null){
        const visits = new ProductVisit (req.body)
        visits.save()
       

    }else{ 
        let updateVisits = data.visits + 1
     await ProductVisit.updateOne({product_id:req.body.product_id},{visits:updateVisits})
    }
 
   })  
   
 

    
   
 
     
    
}

module.exports={Visitation}  