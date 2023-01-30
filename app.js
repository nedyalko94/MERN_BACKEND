const express = require("express");
require("dotenv"); // import env
require("dotenv").config(); // config env // import express
const mongoose = require("mongoose"); // import db
const cors = require("cors"); // import cors  for middleware
const passport = require('passport');
const passportLocal = require('passport-local')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const bodyParser = require('body-parser')
const connectDB = require("./Config/db");
const ProductRoutes = require("./Routes/ProductRoutes");
const UserRouter = require("./Routes/UserRoutes");
const GeneralRoute = require('./Routes/GeneralRoute')
require("./Config/passport")(passport)

const { createServer } = require("http") 
// const { Server } = require("socket.io");

const app = express(); //start app

const httpServer = createServer(app)

// const io = new Server (httpServer, { cors:{
//   origin:'http://localhost:3000',
//   credentials:true 
// } }) 


// io.on("connection", (socket) => {
// console.log('someone has connect')
// socket.on('disconnect',()=>{
//   console.log('someone has left')
// })
// });
 


//---------connection ----------------------------------
connectDB();


//------------------------------middleware------------------------

app.use(cors({
  origin:"mernshop-two.vercel.app",
  credentials:true,
 "Access-Control-Allow-Origin":"*"
  // origin:"https://endprojectcybertech.netlify.app"

}))



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true,  expire:60*60*24 }  //1 day 

}))
app.use(cookieParser('secret key'))
app.use(passport.initialize())
app.use(passport.session())

app.use('/storage', express.static("./storage"))// express static allow us to use static date like picture or document


//bodyParser

// Express Session 



// connect flash
// app.use(flash())

// global var for def color message

// app.use((req,res,next)=>{
//   res.locals.success_msg= req.flash('success_msg')
//   res.locals.error_msg= req.flash('error_msg')
//   res.locals.error= req.flash('error')
//   next()
// })
 





// ----------------------------------------------- Route--------------------------
app.use("/Product", ProductRoutes);

app.use("/Users", UserRouter);
app.use("/", GeneralRoute);  



// import env variables for port
let port = process.env.PORT || 8080; 
   
//start server at port ...
httpServer.listen(port, () => console.log(`is running at ${port} `));


      
