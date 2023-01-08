

const {ProductVisit}= require('../Models/ProductVisitSchema')


const getProductVisits=(req,res)=>{

    ProductVisit.find({},(err,data)=>{
        if (err){console.log(err)}
         data.sort((a,b)=>  b.visits - a.visits)
         let top10  = data.slice(0,10)
        res.status(200).json({Trending:top10,msg:'trending top 10'})
    
       })

}
module.exports={getProductVisits}

  