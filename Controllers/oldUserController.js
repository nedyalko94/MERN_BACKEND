const User = require('../Models/UserSchema')
// have to import both otherwise save my user with schema of Product need fix !
// fix const User = require('./DBSchema')[1]
// const [Product,User] = require('./DBSchema')

module.exports=({
    UserHome:function(req,res){
        res.send('welcome to the homepage')

    },
     NewUser:function(req,res){
        let user = new User(req.body)
        user.save()
        .then(result =>{ 
            res.json({
                msg:'user is save',
                User:result
            })
        })
     },
     findUserByUsernameOrName: function (req, res) {
        // console.log(req.query.username)
       
       
         if (req.query.firstname !== undefined) {
            User.find({ FirstName: { $regex: req.query.firstname } })
                .then(results => {
                    res.json({
                        message: 'ok get it by FirstName',
                        User: results
                    })
                })}
        else if (req.query.username !== undefined) {
             User.find({ UserName: { $regex: req.query.username } })
                .then(results => {
                    res.json({
                         message: 'ok get it by username',
                         User: results
                            })
                })
    
        } 
        else if (req.query.email !== undefined) {
            User.find({ Email: { $regex: req.query.email } })
               .then(results => {
                   res.json({
                        message: 'ok get it by username',
                        User: results
                           })
               })
   
       } 
        else {
            User.find({})
                .then(User => res.json({ message: 'no match on your research', User: User }))
        }
    },



    //  ,
    UserNotFound: function (req, res) {
        res.json({ message: ' user not found' })
    }
})