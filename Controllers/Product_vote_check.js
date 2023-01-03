const { ProductVote } = require("../Models/ProductVoteSchema")
const Product = require('../Models/ProductSchema')
const User = require('../Models/UserSchema')

const Product_vote_check = async (req, res) => {
    if (!req.body.user || !req.body.product) {
        return res.json({ msg: 'you\'re not log in', vote: false })
        // if product or user don't exist return false 
    }
    const product = req.body.product
    const user = req.body.user
    const voteValue = req.body.value

    // req.body = {
    //     product_id:product._id,
    //     user_id:user._id,
    //     vote:voteValue


    // }

    ProductVote.find({ product_id: product._id }, (err, data) => {
        if (err) { res.json({ msg: 'server error', vote: false }) }
        if (data.length === 0) {
            //check if someone already vote this product
                    res.json({ msg: 'product isn\'t found can be vote', vote: true, result: data })
        }
        else if (data.length > 0) {
            ProductVote.find({ user_id: user._id }, (err, data) => {
            //check if user already vote this product
                if (err) { res.json({ msg: 'server error', vote: false }) }
                if (data.length === 0) {
                    res.json({ msg: 'product is found but user don\'t can be vote', vote: true, result: data })

                } else {
                    res.json({ msg: 'product && user are found can\'t be vote', vote: false, result: data })
                }
            })
        }
    })



}

module.exports = { Product_vote_check }









