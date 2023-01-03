const Product = require("../Models/ProductSchema");


const Delete_All = async(req,res)=>{
     await Product.deleteMany({})

      const AllProduct = await Product.find({}).then(result=>{
        res.json({
          msg:'all get deleted ! ',
          data:result
           
        })
      })

  }



  const Delete_Product = async(req,res)=>{ 

    const {id} =req.params 
    await Product.findByIdAndDelete(id,req.body)
   
    
   await Product.find({}).then(result=>{
      res.json({
        msg:'delete',
        data:result
         
      })
    })
         
    
  }

  module.exports={Delete_All,Delete_Product}