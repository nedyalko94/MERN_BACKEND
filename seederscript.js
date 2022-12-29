require('dotenv').config() 
 const someProduct = require('./LocalDB/LocalDB') // product db
 const connectDB = require('./Config/db') // db connect
 const Product = require('./Models/ProductSchema')

 connectDB()


 // function that will delete everything in db and will import te new one 
 const importData = async ()=>{
    try {
        // console.log(someProduct)
        await Product.deleteMany({})
        await Product.insertMany(someProduct)
        console.log(`date import success`)
        process.exit()
    } catch (error) {
        console.error('error with import date ')
        process.exit(1)
    }
 }

 importData()

 // some problem withh function import data :S 