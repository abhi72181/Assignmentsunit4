const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    gender:{type:String,required:true},
    Dateofbirth:{type:String,required:true},
    type:{type:String,required:true},
},{
    timestamps:true,
    versionkey:false
})

const User=mongoose.model("user",userSchema)
module.exports=User