const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    title:{type:String,required:true},
    price:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

const Product=mongoose.model("product",productSchema)

module.exports=Product