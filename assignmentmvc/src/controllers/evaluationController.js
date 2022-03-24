const express=require("express")
const Evaluation = require("../models/evaluation.models")
const router=express.Router()

router.get("",async(req,res)=>{
    try {
        const evaluation=await Evaluation.find().lean().exec()
        return res.status(200).send(evaluation)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.post("",async(req,res)=>{
    try {
        const evaluation=await Evaluation.create(req.body)
        return res.status(200).send(evaluation)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})
module.exports=router