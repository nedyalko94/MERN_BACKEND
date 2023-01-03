"use strict";
const nodemailer = require("nodemailer");
 require('dotenv')

 const mail = async(req,res) =>{
  console.log(req.body)
 
  let transporter = nodemailer.createTransport({
    service:process.env.SERVICE,
    host:process.env.HOST, 
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.TRANSPORTER_EMAIL,// "IrinaValeryevnaShaykhlislamova@outlook.com", // generated ethereal 
      pass:process.env.TRANSPORTER_PASSWORD, // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false 

    } 
  });

  let output = ` <h3> New Guest email from ${req.body.name}</h3>
  <ul>
  <li> <h3> Name : ${req.body.name} </h3></li>
  <li> <h3> Email: ${req.body.email} </h3> </li>

  </ul>

  <p> ${req.body.message} </p>


  `

   const mailOption = {
    from: ` ${req.body.name} ${req.body.email}" <${process.env.TRANSPORTER_EMAIL}>`, // sender address
    to: 'nbdnnt@gmail.com',
    // "bar@example.com, baz@example.com", // list of receivers
    subject: `${req.body.subject}`, // Subject line
    text: "no idea where this got display", // plain text body
    html:output,
    date: new Date (Date.now())
    // "<b>Hello world?</b>", // html body
  }

//   send mail with defined transport object
//   let info = await
   transporter.sendMail(mailOption  ,(err,info)=>{ 
    if (err){
        res.send({msg:'email fail to be send'})
        console.log('fail to send',err)
    } else{
        res.send({msg:'email was send successfully'})
        console.log('email was send successfully',info.messageId)
    }


    
    // console.log("Message sent: %s", info.messageId);
    // console.log(mailOption)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... 
   
 
  
  });

 
 
} 

// mail().catch(console.error);
module.exports={mail} 
