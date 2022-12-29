// const cors = require("cors")
 const multer = require("multer")

 //@ https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
 //

const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./storage')
     
    },
    filename:(req,file,cb)=>cb(null, Date.now() + '[Mushmuroka]'+'.'+ file.originalname.split('.').slice(-1)[0])
  })
  
  const uploader = multer({storage,
  fileFilter:(req,file,callback)=>{
    // console.log(file.mimetype)
    let extensions = "/jpg|jpeg|png|gif/"
    const format2= ['image/gif','image/jpeg','image/png','image/jpg']
    let isValidImg = format2.filter((img)=> img ===file.mimetype)
    
    // burp suit program for security 
  
  
  
    // if(file.mimetype == format) // we can add multy condition 
    // we can add multy condition 
    if(isValidImg.length>0)
        {
        callback(null,true)
    }
    else{
        callback(new Error("not allowed"))
    }
  
  
  }})

  module.exports={uploader}