// const { default: mongoose } = require("mongoose");
const Email  = require ('../Models/EmailSchema')
const { sendEmail } = require('./EmailValidation')


const NewsLetterSend =(req,res)=>{
    console.log(req.body)
    const title = req.body.title
    const message = req.body.message
    const html = req.body.html


    Email.find({},(err,data)=>{ 
         if(err){console.log(err)
        }else{  
            data.forEach(async(user) => {
                // setInterval(async() => {
                    await sendEmail(user.email, `${title}`,`${html} `, message)  
                //   }, 5000)
                   

            });  
        }})
     
    
}


module.exports = {NewsLetterSend} 