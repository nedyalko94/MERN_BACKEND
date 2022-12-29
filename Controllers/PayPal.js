// const paypal = require('paypal-rest-sdk');
const { sendEmail } = require('./EmailValidation')
const Product = require('../Models/ProductSchema')
const {PurchaseHistory}=require('../Models/PurchaseHistorySchema')


// products:{type:Array},
// user:{type:String},
// user_id:req.body.user_id,
// verifiedBuyer:{type:Boolean,
//     default:true},
// verifiedBuyAt:{type:Date,default:Date.now()


const onApprove = async(req, res) => {
    // console.log(req.body)
    const product = req.body.Product
    const NumberOfProduct = req.body.NumberOfProduct
    const PaymentDetail = req.body.PaymentDetail
    let user = process.env.USER

    let LogInUser=req.body.user
    let history = {
        products:[NumberOfProduct,product],
        product_id:product._id,
        user:LogInUser,
        user_id:req.body.user_id,
        PaymentDetail:PaymentDetail


    }
    console.log(LogInUser)

        const paypalHistory = new PurchaseHistory(history)
        paypalHistory.save()

    const message = ` new  purchase from ${PaymentDetail.payer.email_address}  , name ${PaymentDetail.payer.name.given_name} `

    let output = `
    <h3>  ${message}  </h3>  
    <h3> Product Name :${product.Name}   </h3> 
    <h3> Product id:  ${product._id}  </h3>   
    <h3> Brand:  ${product.Brand} </h3>  
    <h3> Categories :${product.Categories} </h3> 
    <h3> ${product.Price}  </h3>  
    <h3> number of product ${NumberOfProduct}</h3> 
    <h3> Total ${NumberOfProduct*product.Price}  </h3> 
        
      
        `


    // i got 3 obj from front   payment detail / count and product 
    // "PaymentDetail":details,
    // "NumberOfProduct":Quantity,
    // "Product":ProductId

    // sendEmail(user, "New Purchase", output, message)

    let result
    const getQuantityLeft = ()=>{  result =product.CountOfStock -NumberOfProduct  }
    getQuantityLeft ()
   await Product.findByIdAndUpdate({ _id: product._id },{CountOfStock:result})
    // console.log(product)
    // console.log(result)


}



module.exports = { onApprove } 