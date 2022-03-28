const express=require("express")
const router=express.Router()
const authenticate=require("../middlewares/authenticate")
const Post=require("../models/posts.model")

router.post("",authenticate,async(req,res)=>{
    req.body.userId=req.user._id
    try {
        const post=await Post.create(req.body)
        return res.status(200).send(post)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.get("",async(req,res)=>{
    
    try {
        const post=await Post.find().lean().exec()
        return res.status(200).send(post)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.patch("/:id",authenticate,async(req,res)=>{
    
    try {
        const post=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(post)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.delete("/:id",authenticate,async(req,res)=>{
    
    try {
        const post=await Post.findByIdAndDelete(req.params.id)
        return res.status(200).send(post)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

module.exports=router