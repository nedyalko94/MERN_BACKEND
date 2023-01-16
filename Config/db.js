const { default: mongoose } = require('mongoose')

require('dotenv')

const connectDB = async()=>{
    try {
         mongoose.connect(process.env.MONGO_URI,
            {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true not supported
        }
        )
        console.log('db connect "Success"') 
    } catch (error) { 
        console.error('db connect fail')
        process.exit(1)
    }

}
    module.exports = connectDB
