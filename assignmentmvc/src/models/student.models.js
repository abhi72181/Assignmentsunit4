const mongoose=require("mongoose")

const studentSchema=mongoose.Schema({
    rollId:{type:String,required:true},
   
    currentBatch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"batch",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

const Student=mongoose.model("student",studentSchema)
module.exports=Student