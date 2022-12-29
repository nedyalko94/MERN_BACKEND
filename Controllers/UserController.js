const passport = require('passport')
const User = require('../Models/UserSchema')
// have to import both otherwise save my user with schema of Product need fix !
// fix const User = require('./DBSchema')[1]
// const [Product,User] = require('./DBSchema')

module.exports = ({
    UserHome: function (req, res) {
        res.send('welcome to the homepage')

    },
    NewUser: function (req, res) {
        let user = new User(req.body)
        user.save()
            .then(result => {
                res.json({
                    msg: 'user is save',
                    User: result
                })
            })
    },
    findUserByUserNameOrName: function (req, res) {
        // console.log(req.query.username)
        // console.log(req.query)

    //     for(let value in req.query){
    //    //     console.log(req.query[value])
    //         if(req.query[value] !==''){
    //             console.log(req.query[value],value)
    //         }
    //     }

        if (req.query.firstname !== undefined) {
            User.find({ FirstName: { $regex: req.query.firstname } })
                .then(results => {
                    res.json({
                        message: 'ok get it by firstname',
                        User: results
                    })
                })
        }
        else if (req.query.username !== undefined) {
            User.find({ username: { $regex: req.query.username } })
                .then(results => {
                    res.json({
                        message: 'ok get it by username',
                        User: results
                    })
                })

        }
        else if (req.query.lastname !== undefined) {
            User.find({ LastName: { $regex: req.query.lastname } })
                .then(results => {
                    res.json({
                        message: 'ok get it by lastname',
                        User: results
                    })
                })

        }
        else if (req.query.country !== undefined) {
            User.find({ Country: { $regex: req.query.country } })
                .then(results => {
                    res.json({
                        message: 'ok get it by county',
                        User: results
                    })
                })

        }
        else if (req.query.city !== undefined) {
            User.find({ City: { $regex: req.query.city } })
                .then(results => {
                    res.json({
                        message: 'ok get it by city',
                        User: results
                    })
                })

        }
        else if (req.query.gender !== undefined) {
            User.find({ Gender: { $regex: req.query.gender } })
                .then(results => {
                    res.json({
                        message: 'ok get it by gender',
                        User: results
                    })
                })

        }


        else if (req.query.email !== undefined) {
            User.find({ Email: { $regex: req.query.email } })
                .then(results => {
                    res.json({
                        message: 'ok get it by email',
                        User: results
                    })
                })

        }
        else if (req.query.postcode !== undefined) {
            User.find({ PostCode: { $regex: req.query.postcode } })
                .then(results => {
                    res.json({
                        message: 'ok get it by postcode',
                        User: results 
                    })
                })

        } 
        else {
            User.find({})
                .then(User => res.json({ msg: 'no match on your research', User: User }))
        }
    },
 

    UserNotFound: function (req, res) {
        res.json({ msg: ' user route not found' })
    },
})



//https://www.mongodb.com/docs/v4.4/text-search/ for sort
//https://www.mongodb.com/docs/v4.4/text-search/#sorting
// db.stores.find(
//     { $text: { $search: "java coffee shop" } },
//     { score: { $meta: "textScore" } }
//  ).sort( { score: { $meta: "textScore" } } )