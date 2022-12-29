const Product = require("../Models/ProductSchema");




const  ProductUpload = async(req,res)=>{
  console.log(req.body)
  const arrayOfPicture=[]
  
  req.files.forEach(element => {
    arrayOfPicture.push(element.path.toString()) 
    // console.log(arrayOfPicture)
    
  });
  const obj= { 
    Name:req.body.Name,
    Brand:req.body.Brand,
    CountOfStock:req.body.CountOfStock,
    Categories:req.body.Categories,
    Description:req.body.Description, 
    Price:req.body.Price,
    Rating:req.body.Rating, 
    NumberOfVote:req.body.NumberOfVote,
    Picture: arrayOfPicture
  } 
  


  try {
    let product = new Product(obj);
   
    
    product.save().then((result) => {
      // console.log(result)
      res.json({
        msg: "product is save",
        product: result,
      });
    })
    } catch (error) {
       console.error(error)
       res.json({msg:"upload fail"})
    }

}

// get by id

const getProductById = async(req,res)=>{
  try {
    const product = await Product.findById(req.params.id)
      res.json(product)
  } catch (error) {
     console.error(error)
     res.status(500).json({msg:"server error by id"})
  }
}

// find and delete by id

const DeleteProduct = async(req,res)=>{
  try {
    
     
  const {id} =req.params
  Product.findByIdAndDelete(id,req.body)
  .then(result=>{
    res.json({
      msg:'delete',
      data:result
       
    })
  })
       
  } catch (error) {
     console.error(error)
     res.status(500).json({message:"server error delete"})
  }
}


const UpdateProduct = async(req,res)=>{
  try {
    const arrayOfPicture=[]
  
    req.files.forEach(element => {
      arrayOfPicture.push(element.path.toString()) 
      console.log(arrayOfPicture)
      
    });
    const obj= { 
      Name:req.body.Name,
      Brand:req.body.Brand,
      CountOfStock:req.body.CountOfStock,
      Categories:req.body.Categories,
      Description:req.body.Description, 
      Price:req.body.Price,
      Rating:req.body.Rating, 
      NumberOfVote:req.body.NumberOfVote,
      Picture: arrayOfPicture
    } 
   
     
  const {id} =req.params
  Product.findByIdAndUpdate(id,obj)
  .then(result=>{
    console.log(result)
    res.json({
      msg:'updated',
      data:result 
       
    })
  }) 
       
  } catch (error) {
     console.error(error)
     res.status(500).json({msg:"server error update error"})
  }
}
 

// const UpdateProduct = (req,res)=>{
//   const {id} =req.params
//   Product.findByIdAndUpdate(id,req.body)
//   .then(result=>{
//     res.json({
//       message:'updated',
//       data:result
        
//     })
//   })
// }


// get 

const findProduct = async(req,res)=>{
  try {
    // console.log(req.query.name);
    if (req.query.name !== undefined) {
      Product.find({ Name: { $regex: req.query.name } }).then((results) => {
        res.json({
          msg: "ok get it by name",
          Product: results,
        });
      });
    } else if (req.query.brand !== undefined) {
      Product.find({ Brand: { $regex: req.query.brand } }).then((results) => {
        res.json({
          msg: "ok get it by brand",
          Product: results,
        });
      });
    } else if (req.query.categories !== undefined) {
      Product.find({ Categories: { $regex: req.query.categories } }).then(
        (results) => {
          res.json({
            msg: "ok get it by categories",
            Product: results,
          });
        }
      );
    } else if (req.query.cate !== undefined) {
      Product.find({})
      .then((product) =>{
        let OnlyCategories = ()=>{  
           let onlyCategories = []
           product.map((res) => {
           if (   !onlyCategories.includes(res.Categories ) )
           { onlyCategories.push(res.Categories) }
           // return onlyCategories;
         })
         let CategoriesToArrOfObj = onlyCategories.sort().map((e)=>{
           let obj = {Categories:e}
           return obj
       })
       return CategoriesToArrOfObj
        } 
       
       return OnlyCategories()
   


      }).then((result)=>
     { 
      res.json({ 
        msg: " ok get  only categories ", 
        Product:result,
       }) 
      }
    ); 
    } else {
      Product.find({}).then((product) =>
        res.json({ msg: "ok no match by query get them all ", Product: product })
      );
    }
  } catch (error) {
     console.error(error)
     res.status(500).json({msg:"server error find"})
  }
}




const DeleteAll = async(req,res)=>{
  try {
    Product.deleteMany({})
    .then(result=>{
      res.json({
        msg:'all get deleted ! ',
        data:result
         
      })
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({msg:"can't delete all  "})
    
  }
}

const ProductNotFound = async(req,res)=>{
  try {
    res.json({ msg: " product not found" })
  } catch (error) {
     console.error(error)
     res.status(500).json({msg:"server error not found"})
  }
}


module.exports = {
  // getAllProduct,
  getProductById,
  DeleteProduct,
  findProduct,
  UpdateProduct,
  ProductNotFound,
  ProductUpload,
  DeleteAll



}


// module.exports = {
//   ProductHome: function (req, res) {
//     res.send("welcome to the homepage");
//   },


//   // findProductByName:function(req,res){
//   //     console.log(req.query.Name)
//   //     if(req.query.Name !==undefined)
//   //         {Product.find({Name: { $regex: req.query.Name }})
//   //          .then(results=>{
//   //              res.json({
//   //             msg:'ok',
//   //             Product:results

//   //              })
//   //         })
//   //     }
 
//   // },
//   findProduct: function (req, res) {
//     // console.log(req.query.name);
//     if (req.query.name !== undefined) {
//       Product.find({ Name: { $regex: req.query.name } }).then((results) => {
//         res.json({
//           message: "ok get it by name",
//           Product: results,
//         });
//       });
//     } else if (req.query.brand !== undefined) {
//       Product.find({ Brand: { $regex: req.query.brand } }).then((results) => {
//         res.json({
//           message: "ok get it by username",
//           Product: results,
//         });
//       });
//     } else if (req.query.categories !== undefined) {
//       Product.find({ Categories: { $regex: req.query.categories } }).then(
//         (results) => {
//           res.json({
//             message: "ok get it by categories",
//             Product: results,
//           });
//         }
//       );
//     } else if (req.query.cate !== undefined) {
//       Product.find({}).then((product) =>
//         res.json({
//           message: "only categories ",
//           Product: product.map((res) => {
//             let onlyCategories = { Categories: res.Categories };
//             return onlyCategories;
//           }),
//         })
//       );

//     //   Product.find({}).then((product) =>
//     //   res.json({
//     //     message: "only categories ",
//     //     Product: product.map((res) => {
//     //       let onlyCategories = { Categories: res.Categories };
//     //       return onlyCategories;
//     //     }),
//     //   })
//     // );

//     } else {
//       Product.find({}).then((product) =>
//         res.json({ message: "no match on your research", Product: product })
//       );
//     }
//   },

//   //  NewUser:function(req,res){
//   //     let user = new User(req.body)
//   //     user.save()
//   //     .then(result =>{
//   //         res.json({
//   //             msg:'user is save',
//   //             user:result
//   //         })
//   //     })
//   //  },

//   //  ,
//   ProductNotFound: function (req, res) {
//     res.json({ message: "not found" });
//   },
// };
 