const { ProductVote } = require("../Models/ProductVoteSchema")
const Product = require('../Models/ProductSchema')
const User = require('../Models/UserSchema')

const Product_vote_check = async (req, res) => {
    if (!req.body.user || !req.body.product) {
        return res.json({ msg: 'you\'re not log in', vote: false })
    }
    const product = req.body.product
    const user = req.body.user

    const voteValue = req.body.value

    // const obj = {
    //     product_id:product._id,
    //     user_id:user._id,
    //     vote:voteValue


    // }

    ProductVote.find({ product_id: product._id }, (err, data) => {
        if (err) { res.json({ msg: 'server error', vote: false }) }
        if (data.length === 0) {
            Product.findById({ _id: product._id }, async (err, result) => {
                if (err) { res.json({ msg: 'server error / product can\'t be found', vote: false, result: result }) }
                else {
                    let voteUpdate = result.NumberOfVote +1
                    // need better formula/algorithm this one is not good/ wrong 
                    let voteResult =result.Rating ==0? voteValue:(result.Rating * result.NumberOfVote+voteValue )/voteUpdate
                    console.log(voteResult)
                       await Product.findByIdAndUpdate({_id:product._id},{NumberOfVote:voteUpdate,Rating:voteResult})
                    // .toFixed(1) in front end otherwise here cause bug 
                    res.json({ msg: 'product isn\'t found can be vote', vote: true, result: result })
                }
            })

            // const newVote = new ProductVote(obj)
            // newVote.save()

            // res.json({result:data,msg:'vote is save'}


            // )
        }
        else if (data.length > 0) {
            ProductVote.find({ user_id: user._id }, (err, data) => {
                if (data.length === 0) {
                    // const newVote = new ProductVote(obj)
                    // newVote.save()
                    // res.json({result:data,msg:'vote already exist from another user this is add as well'})
                    // console.log(newVote)
                    res.json({ msg: 'product is found but user don\'t can be vote', vote: true, result: data })

                } else {

                    // res.json({result:data,msg:'already register from same user and product don\'t get save'})
                    // console.log(data)
                    res.json({ msg: 'product && user are found can\'t be vote', vote: false, result: data })


                }

            })

        }


    })



}

module.exports = { Product_vote_check }









