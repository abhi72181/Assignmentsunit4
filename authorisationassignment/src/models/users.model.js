const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:[{type:String,required:true}]
},{
    timestamps:true,
    versionKey:false
})
userSchema.pre("save",function(next){
    const hash = bcrypt.hashSync(this.password, 3)
    this.password=hash
    next()
})
userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}
const User=mongoose.model("user",userSchema)
module.exports=User