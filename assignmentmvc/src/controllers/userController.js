const express=require("express")
const User = require("../models/user.models")
const router=express.Router()


router.get("/",async(req,res)=>{
    try {
        const user=await User.find().lean().exec()
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.post("/",async(req,res)=>{
    try {
        const posts=await User.create(req.body)
        return res.status(200).send(posts)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})


module.exports=router