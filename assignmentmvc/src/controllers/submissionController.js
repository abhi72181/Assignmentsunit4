const express=require("express")
const Submission = require("../models/submission.models")
const router=express.Router()

// router.get("/",async(req,res)=>{
//     try {
//         const submission=await Submission.find().lean().exec()
//         return res.status(200).send(submission)
//     } catch (error) {
//         return res.status(400).send({message:error.message})
//     }
// })

router.post("",async(req,res)=>{
    try {
        const submission=await Submission.create(req.body)
        return res.status(200).send(submission)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.get("/evaluations/:id",async(req,res)=>{
    try {
        const submission=await Submission.find({evaluationId:{$eq:req.params.id}}).populate("evaluationId").populate("studentId").lean().exec()
        return res.status(200).send(submission)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.get("/",async(req,res)=>{
    try {
        const submission=await Submission.findOne().populate("studentId").populate("evaluationId").sort({"marks":-1}).lean().exec()
        return res.status(200).send(submission)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

module.exports=router