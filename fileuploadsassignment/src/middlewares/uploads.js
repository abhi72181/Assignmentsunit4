
const path=require("path")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../my-uploads"))
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() 
      cb(null, uniquePrefix+'-' + file.originalname  )
    }
  })
  function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
     if(file.mimetype==="image/jpeg"||file.mimetype==="image/png"){
       // To accept the file pass `true`, like so:
    cb(null, true)
     }
     else{
       // To reject this file pass `false`, like so:
    cb(new Error("Incorrect mimetype"), false)
     }
  
  }
const options={
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
}
const uploads = multer(options)

module.exports=uploads