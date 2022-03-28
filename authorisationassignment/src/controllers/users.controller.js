const express=require("express")
const router=express.Router()
const User=require("../models/users.model")
router.get("",async(req,res)=>{
    try {
        const user=await User.find().lean().exec()
        return res.send(user)
    } catch (error) {
        return res.send({message:error.message})
    }
})
module.exports=router