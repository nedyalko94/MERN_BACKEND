 const express=require('express')
const ProductRouter =express.Router() 
const {getAllProduct,getProductById,DeleteProduct,findProduct,UpdateProduct, ProductNotFound ,ProductUpload,DeleteAll } = require('../Controllers/ProductController')
const {uploader} =require('../Middleware/ProductMiddleware')
const {CreateComment} = require('../Controllers/CreateComment')
const {GetComment} = require('../Controllers/getComment')
const {Product_vote}= require('../Controllers/Product_vote')
const {Product_vote_check}= require('../Controllers/Product_vote_check')
const {Product_Update} = require('../Controllers/Product_Update')
const {Delete_All,Delete_Product} = require('../Controllers/Product_Delete')
const {Visitation} = require('../Controllers/Product_PostVisit')
const {getProductVisits} = require('../Controllers/Product_GetVisit')


// post visit
ProductRouter.post('/visit',Visitation)
ProductRouter.get('/get_visit',getProductVisits)
// ProductRouter.post('/visit',Visitation)




ProductRouter.get('/:id',getProductById)

// Product
//   ProductRouter.get('/ProductHome',ProductHome)

  ProductRouter.get("/",findProduct) 

  // http://localhost:3004/Product/? // all
  // http://localhost:3004/Product/?name=${ } //by name
  // http://localhost:3004/Product/?categories=${} // by categories
  // http://localhost:3004/Product/?brand=${}  // by brand 
  // http://localhost:3004/Product/?cate  // ony categories  you can't filter them  with =${}

 
  // ,uploader.any('Picture')
  ProductRouter.post('/AddProduct',ProductUpload) 

  //http://localhost:3004/Product/AddProduct  
//,uploader.any('Picture')
ProductRouter.put('/UpdateProduct/:id',Product_Update)
// http://localhost:3004/Product/UpdateProduct/6355497afb3f2011ff590ce9


ProductRouter.delete('/DeleteProduct/:id',Delete_Product) 
//http://localhost:3004/Product/DeleteProduct/6350d16556ff9a31da69b833  
 
 
ProductRouter.delete('/DeleteAll',Delete_All)

ProductRouter.get('*',ProductNotFound)

// ---------------------------------------Comments-------------------------------------- 
ProductRouter.post('/Comments/:id',CreateComment)
ProductRouter.post('/getComments/:id',GetComment) 

ProductRouter.post('/vote',Product_vote)
ProductRouter.post('/vote_check',Product_vote_check)
 


//http://localhost:3004/Product/Comments/:id 
 


module.exports = ProductRouter   