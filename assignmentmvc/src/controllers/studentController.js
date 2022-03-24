const express=require("express")
const Student = require("../models/student.models")
const router=express.Router()

router.get("",async(req,res)=>{
    try {
        const students=await Student.find().lean().exec()
        return res.status(200).send(students)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.post("",async(req,res)=>{
    try {
        const students=await Student.create(req.body)
        return res.status(200).send(students)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})
module.exports=router