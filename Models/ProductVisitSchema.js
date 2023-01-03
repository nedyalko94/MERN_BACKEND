const mongoose = require('mongoose')

const VisitationsSchema = mongoose.Schema({
product:{ type:Object},
visits:{type:Number}
})

const ProductVisit = mongoose.model ('product_visit',VisitationsSchema)
module.exports= {ProductVisit}