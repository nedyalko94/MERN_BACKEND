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

const app = express(); 

const httpServer = createServer(app)


 


//---------DB Connection ----------------------------------
connectDB();

//------------------------------middleware------------------------

app.use(cors({
  origin:["https://endprojectcybertech.netlify.app","https://mernshop-two.vercel.app"],
  'Access-Control-Allow-Origin':["https://endprojectcybertech.netlify.app","https://mernshop-two.vercel.app"],
  credentials:true,
  // origin:"https://endprojectcybertech.netlify.app"
  // origin:"https://mernshop-two.vercel.app",


}))

app.set("trust proxy", 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: false,
  cookie: {
    sameSite: "none", // must be 'none' to enable cross-site delivery
    secure: true, // must be true if sameSite='none'
  }
  //------------------------------------------
  // -----------https://stackoverflow.com/questions/66503751/cross-domain-session-cookie-express-api-on-heroku-react-app-on-netlify
  // cookie: { secure: true,  expire:60*60*24 }  //1 day 
}))
app.use(cookieParser('secret key'))
app.use(passport.initialize())
app.use(passport.session())

app.use('/storage', express.static("./storage"))// express static allow us to use static date like picture or document


// Express Session 

// ----------------------------------------------- Route--------------------------
app.use("/Product", ProductRoutes);

app.use("/Users", UserRouter);
app.use("/", GeneralRoute); 

// import env variables for port
let port = process.env.PORT || 8080; 
   
//start server at port ....
httpServer.listen(port, () => console.log(`is running at ${port} `));


      
