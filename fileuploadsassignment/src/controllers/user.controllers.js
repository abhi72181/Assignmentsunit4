const express=require("express")

const router=express.Router()
const uploads=require("../middlewares/uploads")
const User = require("../models/user.models")
router.get("",async(req,res)=>{
    try {
        const users=await User.find().lean().exec()
        return res.status(200).send(users)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

router.post("",uploads.single("profile_Pic"),async(req,res)=>{
try {
    console.log(req.file.path)
    const user=await User.create({
        first_name:req.body.first_name,
        profile_Pic:req.file.path
    })
    
    return res.status(200).send(user)
} catch (error) {
    return res.status(500).send({message:error.message})
}
})

module.exports=router