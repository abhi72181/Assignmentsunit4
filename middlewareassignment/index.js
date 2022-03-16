const express=require("express")
const app=express()

app.use(allbooks)

app.get("/book/:name",singleBook,(req,res)=>{
    return res.send({bookName:req.name})
})

app.get("/book2",(req,res)=>{
    return res.send("book2")
})

app.get("/books",(req,res)=>{
    return res.send("Fetching all books")
})

function singleBook(req,res,next){
    req.name=req.params.name
    next()
}

function allbooks(req,res,next){

    next();
    console.log("found books")
}


app.listen(3500,()=>{
    console.log("live port 3500")
})