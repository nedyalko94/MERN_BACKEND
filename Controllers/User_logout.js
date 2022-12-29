
const logout=(req,res)=>{
    req.logout((err)=>console.log(err))
    // req.flash('success_msg','you are log out ')
    // req.flash('success_msg', ' you are log out ')
    // res.redirect('/Users/login')
     res.json({msg:"logout"})}

     module.exports={logout}