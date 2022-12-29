const mongoose = require ('mongoose')
const User = require('../Models/UserSchema')
const bcryptjs = require('bcryptjs')
const User_Info_Update = async(req,res)=>{
 console.log(req.body)
    const {id} = req.params

     let user = await User.findOne({ _id: id })

    let myError = []
    let mySuccess=[]

    const {username,Email,password,Password2,FirstName,LastName,Gender,Country,City,PostCode,Street,NumberOfStreet,isAdmin,confirm} = req.body
    if(username !== ''){ await User.findByIdAndUpdate({ _id: id},{username:username}); mySuccess.push('username is updated')}
     if(Email !==''){ await  User.findByIdAndUpdate({ _id: id },{Email:Email})}
    if((password && Password2 !=='') && password == Password2){ 
        const hashPassword = await bcryptjs.hash(password,10)
        const hashPasswordConfirm = await bcryptjs.hash(Password2,10)
        await User.findByIdAndUpdate({ _id: id },{password:hashPassword,Password2:hashPasswordConfirm})

    }
     else {
        //  return   res.json({msg:"password don't match"})
        myError.push('Password don\'t match or you don\'t have value for Password')
      
    }
    if(FirstName !==''){ await User.findByIdAndUpdate({ _id: id },{FirstName:FirstName})}
    if(LastName !==''){ await User.findByIdAndUpdate({ _id: id },{LastName:LastName})}
    if(Gender !==''){ await User.findByIdAndUpdate({ _id: id },{Gender:Gender})}
   if(Country !==''){ await User.findByIdAndUpdate({ _id: id },{Country:Country})}
   if(City !==''){ await User.findByIdAndUpdate({ _id: id },{City:City})}
   if(PostCode !==''){ await User.findByIdAndUpdate({ _id: id },{PostCode:PostCode})}
   if(Street !==''){ await User.findByIdAndUpdate({ _id: id },{Street:Street})}
   if(NumberOfStreet !==''){ await User.findByIdAndUpdate({ _id: id },{NumberOfStreet:NumberOfStreet})}
   if(isAdmin !==''){ await User.findByIdAndUpdate({ _id: id },{isAdmin:isAdmin})}
   if(confirm !==''){ await User.findByIdAndUpdate({ _id: id },{confirm:confirm})}


    console.log(req.body)
    console.log(myError,mySuccess)
        res.json({msg:'user is updated'}) 


    // switch(req.body){
    //     case username!='':
    //         User.updateOne({ _id: id },{username:username})
    //         continue
    //     case Email!='':

    //         User.updateOne({ _id: id },{Email:Email})

           
    //     default:
    //         console.log("Something went wrong");

    // }

    // function(err,update){
    //     // if(err){return res.json({msg:'error something went wrong'})}
    //     if(!update)
    //   {  }
    // }
    // console.log(user)
    // User.findByIdAndUpdate ({id})
    // const obj = {
    //         username:req.body.username,
    //         Email:req.body.Email,
    //         password:req.body.password,
    //         Password2:req.body.Password2, 
    //         FirstName:req.body.FirstName, 
    //         LastName:req.body.LastName,
    //         Gender:req.body.Gender,
    //         Country:req.body.Country,
    //         City:req.body.City, 
    //         PostCode:req.body.PostCode,
    //         Street:req.body.Street,
    //         NumberOfStreet:req.body.NumberOfStreet,
    //         isAdmin:req.body.isAdmin,
    //         confirm:req.body.confirm,
    // }
    // console.log(req.body)
    

}


module.exports = {User_Info_Update}



