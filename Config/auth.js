
module.exports={
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next()

        }else{
            res.redirect('http://localhost:3004')
        }
        
        // req.flash('error_msg','please log in to view this page')


        // res.json({msg:'log in fail / auth fail '})

 
        // res.redirect('/Users/login') 
    } 
}
