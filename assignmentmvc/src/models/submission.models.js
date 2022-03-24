const mongoose=require("mongoose")

const submissionSchema=mongoose.Schema({
    marks:{type:Number,required:true},
    evaluationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"evaluation",
        required:true
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

const Submission=mongoose.model("submission",submissionSchema)
module.exports=Submission