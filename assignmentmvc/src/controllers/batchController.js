const express=require("express")
const Batch = require("../models/batch.models")
const router=express.Router()

router.get("",async(req,res)=>{
    try {
        const batch=await Batch.find().lean().exec()
        return res.status(200).send(batch)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.post("",async(req,res)=>{
    try {
        const batch=await Batch.create(req.body)
        return res.status(200).send(batch)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})
module.exports=router