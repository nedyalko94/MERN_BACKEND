const Product = require("../Models/ProductSchema");

const Product_Update = async(req,res)=>{
    const {id} =req.params

    const {Name,Brand,CountOfStock,Categories,Description,Price,Rating,NumberOfVote,Picture} = req.body
 
 

  if(Name !==''){ await Product.findByIdAndUpdate({ _id: id },{Name:Name})}
  if(Brand !==''){ await Product.findByIdAndUpdate({ _id: id },{Brand:Brand})} 
  if(CountOfStock !==''){ await Product.findByIdAndUpdate({ _id: id },{CountOfStock:CountOfStock})}
 if(Categories !==''){ await Product.findByIdAndUpdate({ _id: id },{Categories:Categories})}
 if(Description !==''){ await Product.findByIdAndUpdate({ _id: id },{Description:Description})}
 if(Price !==''){ await Product.findByIdAndUpdate({ _id: id },{Price:Price})}
 if(Rating !==''){ await Product.findByIdAndUpdate({ _id: id },{Rating:Rating})}
 if(NumberOfVote !==''){ await Product.findByIdAndUpdate({ _id: id },{NumberOfVote:NumberOfVote})}
 if(Picture.length !==0){ await Product.findByIdAndUpdate({ _id: id },{Picture:Picture})}

 //return all product
 let AllProduct = await Product.find({})

  res.json({
    msg:'updated',
    data:AllProduct 
     
  })


}

module.exports = {Product_Update}