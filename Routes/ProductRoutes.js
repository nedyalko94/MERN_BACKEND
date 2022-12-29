 const express=require('express')
const ProductRouter =express.Router() 
const {getAllProduct,getProductById,DeleteProduct,findProduct,UpdateProduct, ProductNotFound ,ProductUpload,DeleteAll } = require('../Controllers/ProductController')
const {uploader} =require('../Middleware/ProductMiddleware')
const {CreateComment} = require('../Controllers/CreateComment')
const {GetComment} = require('../Controllers/getComment')
const {Product_vote}= require('../Controllers/Product_vote')
const {Product_vote_check}= require('../Controllers/Product_vote_check')



ProductRouter.get('/:id',getProductById)

// Product
//   ProductRouter.get('/ProductHome',ProductHome)

  ProductRouter.get("/",findProduct) 

  // http://localhost:3004/Product/? // all
  // http://localhost:3004/Product/?name=${ } //by name
  // http://localhost:3004/Product/?categories=${} // by categories
  // http://localhost:3004/Product/?brand=${}  // by brand 
  // http://localhost:3004/Product/?cate  // ony categories  you can't filter them  with =${}

 

  ProductRouter.post('/AddProduct',uploader.any('Picture'),ProductUpload) 

  //http://localhost:3004/Product/AddProduct  

ProductRouter.put('/UpdateProduct/:id',uploader.any('Picture'),UpdateProduct)
// http://localhost:3004/Product/UpdateProduct/6355497afb3f2011ff590ce9


ProductRouter.delete('/DeleteProduct/:id',DeleteProduct) 
//http://localhost:3004/Product/DeleteProduct/6350d16556ff9a31da69b833  
 
 
ProductRouter.delete('/DeleteAll',DeleteAll)

ProductRouter.get('*',ProductNotFound)

// ---------------------------------------Comments-------------------------------------- 
ProductRouter.post('/Comments/:id',CreateComment)
ProductRouter.post('/getComments/:id',GetComment) 

ProductRouter.post('/vote',Product_vote)
ProductRouter.post('/vote_check',Product_vote_check)
 


//http://localhost:3004/Product/Comments/:id 
 


module.exports = ProductRouter   