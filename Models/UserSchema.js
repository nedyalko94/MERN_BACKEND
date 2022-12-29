const mongoose = require("mongoose");

// user Schema
const UserSchema = mongoose.Schema({
  username: {
   type:String,
   require:true
 },
  Email: {
   type:String,
   require:true,
   unique:true
 
 },
 password: {
  type:String,
  require:true
},
Password2: {
 type:String, 
 require:true
},
  FirstName: {
   type:String,
   require:true
 },
  LastName: {
   type:String,
   require:true 
 },
  Gender: {
   type:String,
   require:true
 },
  Country: {
   type:String,
   require:true
 },
  City: {
   type:String,
   require:true
 },
  PostCode: {
   type:String,
   require:true
 },
  Street: String,
  NumberOfStreet: {
   type:String,
   require:true
 },
 isAdmin:{
  type:Boolean,
  default:false
 },
 confirm:{ 
   type:Boolean,
   default:false
 
  },
 Date: {
  type: Date,
  default: Date.now
}
  // Address:String, 
});


const User = mongoose.model("users", UserSchema);

module.exports = User
// module.exports = Product;
