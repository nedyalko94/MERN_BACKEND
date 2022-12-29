// const paypal = require('paypal-rest-sdk');
const Product = require('../Models/ProductSchema')
const { sendEmail } = require('./EmailValidation')
const {PurchaseHistory}=require('../Models/PurchaseHistorySchema')



const onApproveShoppingCard = (req, res) => {
  console.log(req.body)
  // console.log(req.body.PaymentDetail.payer.address)
  const shipping_full_name = req.body.PaymentDetail.purchase_units[0].shipping.name.full_name
  const shipping_street = req.body.PaymentDetail.purchase_units[0].shipping.address.address_line_1
  const shipping_city = req.body.PaymentDetail.purchase_units[0].shipping.address.admin_area_2
  const shipping_country_code = req.body.PaymentDetail.purchase_units[0].shipping.address.country_code
  const shipping_post_code = req.body.PaymentDetail.purchase_units[0].shipping.address.postal_code
  const ShopListWithQuantity = req.body.ShopListWithQuantity
  const TotalPrice = req.body.TotalPrice
  const PaymentDetail = req.body.PaymentDetail
  let user = process.env.USER
  // console.log( shipping_full_name,shipping_street ,shipping_city,shipping_post_code,shipping_country_code)

  // im splitting purchase to a single item so i can save it 
  function SplitAndSavePurchase() {
    ShopListWithQuantity.forEach(array => {
      let history = {
        products: array,
        product_id:array[1]._id,
        user: req.body.user,
        user_id: req.body.user_id,
        PaymentDetail: PaymentDetail

      }
      const paypalHistory = new PurchaseHistory(history)
      paypalHistory.save()

    });
  }
  SplitAndSavePurchase()

  console.log(PaymentDetail)
  const message = ` New  purchase from ${PaymentDetail.payer.email_address} 
     <br> Name of the Payer: ${PaymentDetail.payer.name.given_name} 
      <br>Shipping Address 
      <br>Full Name : ${shipping_full_name}
      <br>Street: ${shipping_street}
      <br>City: ${shipping_city}
      <br>Post Code: ${shipping_post_code}
      <br>Country: ${shipping_country_code}
      
      
      
      
      
      
      `

  const getUpdate = () => {
    ShopListWithQuantity.forEach(async (array) => {
      const Quantity = array[0]
      const product = array[1]
      const result = product.CountOfStock - Quantity
      await Product.findByIdAndUpdate({ _id: product._id }, { CountOfStock: result })


    });
    console.log(ShopListWithQuantity)
  }

  getUpdate()

  var arrayItems = "";
  var n;
  for (n in ShopListWithQuantity) {
    arrayItems += "<li>" + ` Quantity: ${ShopListWithQuantity[n][0]}` + ` Name: ${ShopListWithQuantity[n][1].Categories} ${ShopListWithQuantity[n][1].Brand} ${ShopListWithQuantity[n][1].Name}` + `Price: ${ShopListWithQuantity[n][1].Price} € ` + ` Total Price: ${ShopListWithQuantity[n][0] * ShopListWithQuantity[n][1].Price} €` + "</li>";
  }

  let output = `
    <h3>  ${message}  </h3>  
   
   <ul>${arrayItems}</ul>
   <hr>
    <h3> Total ${TotalPrice} € </h3>  `

  // sendEmail(user, "New Purchase", output, message) 
}



module.exports = { onApproveShoppingCard }


// let history = {
//   products:[NumberOfProduct,product],
//   user:LogInUser,
//   user_id:req.body.user_id,
//   PaymentDetail:req.body


// }


// "PaymentDetail": details,
// "ShopListWithQuantity": ShopListWithQuantity,
// "TotalPrice":GetTotalPrice,
// "user":user?user:'',
// "user_id":user?user._id:'' 