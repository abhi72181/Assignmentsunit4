const express=require("express")

const usercontroller=require("./controllers/usercontroller")
const app=express()

// const connect=require("./configs/db")

app.use(express.json())

app.use("/users",usercontroller)

 module.exports=app




