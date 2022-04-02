const path = require("path");
const express=require("express")

const router=express.Router();

const User=require("../models/usermodel")
const transporter=require("../configs/mails")




router.post("/",async(req,res)=>{
    try {
        let user=await User.create(req.body)

        transporter.sendMail({
            from: '"Abhishek" <admin@amazon.com>', 
            to: user.email, 
            subject: `Welcome to amazon system ${user.first_name}` ,
            text: `Hi ${user.first_name} `,
          });
      
        return res.send(user)
    } 
    catch(err) {
        return res.send({error:err})
    }
})




router.get("/showpages",async(req,res)=>{
    try {
        let page=req.query.page ||1
        let pagesize=req.query.pagesize||100

        const skip = (page-1) * pagesize;
        const users = await User.find({})
        .skip(skip)
        .limit(pagesize)
        .lean()
        .exec()
        const total_pages = Math.ceil((
                await User.find({})
                .countDocuments())/pagesize)
        return res.send({total_pages,
        users

        })
    } 
    catch (err) {
        res.send({error:err})
    }
})

module.exports=router
