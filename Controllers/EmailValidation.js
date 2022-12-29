
const nodemailer = require('nodemailer')


const sendEmail = async(email,subject,html,text)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            port:587,
            secure:false,
            auth:{
                user:process.env.TRANSPORTER_EMAIL,
                pass:process.env.TRANSPORTER_PASSWORD
            }
        })
        


        await transporter.sendMail({
             from: process.env.TRANSPORTER_EMAIL,
             to:email,
             subject:subject,
             text:text,
             html:html

        }) 
        console.log('email sent success')
    } catch (error) {
        console.log('email was not send ',error)
    }
}
module.exports= {sendEmail}