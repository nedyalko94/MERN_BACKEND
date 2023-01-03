const Product = require("../Models/ProductSchema");
module.exports = {
  ProductHome: function (req, res) {
    res.send("welcome to the homepage");
  },
  NewProduct: function (req, res) {
    let product = new Product(req.body);
    product.save().then((result) => {
      res.json({
        msg: "product is save",
        product: result,
      });
    });
  },
  DeleteProduct: function (req, res) {
    const { Name } = req.query;
    //    const {Name} = req.body
    res.json({
      msg: `${Name} deleted`,
    });
    
  },
  findProduct: function (req, res) {
    // console.log(req.query.name);
    if (req.query.name !== undefined) {
      Product.find({ Name: { $regex: req.query.name } }).then((results) => {
        res.json({
          message: "ok get it by name",
          Product: results,
        });
      });
    } else if (req.query.brand !== undefined) {
      Product.find({ Brand: { $regex: req.query.brand } }).then((results) => {
        res.json({
          message: "ok get it by username",
          Product: results,
        });
      });
    } else if (req.query.categories !== undefined) {
      Product.find({ Categories: { $regex: req.query.categories } }).then(
        (results) => {
          res.json({
            message: "ok get it by categories",
            Product: results,
          });
        }
      );
    } else if (req.query.cate !== undefined) {
      Product.find({}).then((product) =>
        res.json({
          message: "only categories ",
          Product: product.map((res) => {
            let onlyCategories = { Categories: res.Categories };
            return onlyCategories;
          }),
        })
      );
    } else {
      Product.find({}).then((product) =>
        res.json({ message: "no match on your research", Product: product })
      );
    }
  },
  ProductNotFound: function (req, res) {
    res.json({ message: "not found" });
  },
};
 