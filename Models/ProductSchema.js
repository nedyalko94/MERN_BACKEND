const mongoose = require("mongoose");

// Product Schema

const ProductSchema = mongoose.Schema({
  Name: {
    type: String,
    require: false,
  },
  Brand: {
    type: String,
    require: false,
  },
  CountOfStock:{
   type: Number,
   require: false,
 },
  Categories: {
    type: String,
    require: false,
  },
  Description: {
    type: String,
    require: false,
  },
  Price: {
    type: Number,
    require: false,
  },
  Rating: {
    type: Number,
    require: false,
  },
  NumberOfVote: {
    type: Number,
    require: false,
  },
  Picture: {
    type: Array,
    require: false, 
  },
  date: {
    type: Date,
    default: Date.now
  }
}); 


const Product = mongoose.model("products", ProductSchema);

module.exports = Product
// module.exports = Product;
