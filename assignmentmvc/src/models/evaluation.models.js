const mongoose=require("mongoose")

const evaluationSchema=mongoose.Schema({
    dateOfEvaluation:{type:String,required:true},
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    batchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"batch",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

const Evaluation=mongoose.model("evaluation",evaluationSchema)
module.exports=Evaluation