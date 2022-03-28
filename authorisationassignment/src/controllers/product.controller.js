const express=require("express")
const router=express.Router()
const authenticate=require("../middlewares/authenticate")
const authorisation=require("../middlewares/authorisation")
const Product=require("../models/product.model")
router.post("",authenticate,authorisation(["admin","seller1","seller2"]),async(req,res)=>{
    
    try {
        const product=await Product.create(req.body)
        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})
router.get("",async(req,res)=>{

    try {
        const product=await Product.find().lean().exec()
        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})
router.patch("/update/seller2/:id",authenticate,authorisation(["admin","seller2"]),async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.patch("/update/seller1/:id",authenticate,authorisation(["admin","seller1"]),async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})


router.delete("/delete/seller2/:id",authenticate,authorisation(["admin","seller2"]),async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.delete("/delete/seller1/:id",authenticate,authorisation(["admin","seller1"]),async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

module.exports=router