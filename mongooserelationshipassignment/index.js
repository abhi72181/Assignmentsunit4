// users
// 	- firstName
// 	- lastName

// sections
// 	- name // Science, Fiction

// books
// 	- sectionId
// 	- name
// 	- body


// authors
// 	- userId


// book_author
// 	- bookId
// 	- authorId


// checked_out
// 	- userId
// 	- bookId
// 	- checkedOutTime ( default to null ) => date
// 	- checkedInTime ( default to null ) => date


// // Book is not available
// checkedOutTime => 11th Mar 8:00 am -> not null
// checkedInTime => null

// // Book is available
// checkedOutTime => 11th Mar 8:00 am -> not null
// checkedInTime => 12th Mar 8:00 am -> not null // 12 Mar 5 pm
const express=require("express")
// const { connect } = require("http2")
const mongoose=require("mongoose")
const app=express()

const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/assignment")
}

app.use(express.json())

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    gender:{type:String,required:true}
},
{
   
    versionKey: false,
    timestamps: true,
})

const User=mongoose.model("user",userSchema)

const sectionSchema=new mongoose.Schema({
    name:{type:String,required:true}
},{
    timestamps:true,
    versionKey:false
});
const section=mongoose.model("section",sectionSchema)


const bookSchema=new mongoose.Schema({
    bookName:{type:String,required:true},
    body:{type:String,required:true},
    sectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})
const books=mongoose.model("book",bookSchema)


const authorSchema=new mongoose.Schema({
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})
const authors=mongoose.model("author",authorSchema)


const bookauthorSchema=new mongoose.Schema({
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})
const Bookauthor=mongoose.model("bookauthor",bookauthorSchema)

// CRUD OPERATIONS FOR USER

app.get("/users",async(req,res)=>{
    try {
        const users=await User.find().lean().exec()
        return res.send(users)

    } catch (error) {
        console.log(error)
    }
    
})

app.post("/users",async(req,res)=>{
    try {
        let Post=await User.create(req.body)
        return res.send(Post)
    } catch (error) {
     return res.send(error)
    }
    
})
// CRUD OPERATIONS FOR SECTION


app.get("/sections",async(req,res)=>{
    try {
        const sections=await section.find().lean().exec()
        return res.send(sections)

    } catch (error) {
        console.log(error)
    }
    
})

app.post("/sections",async(req,res)=>{
    try {
        let sections=await section.create(req.body)
        return res.send(sections)
    } catch (error) {
     return res.send(error)
    }
    
})

// CRUD OPERATIONS FOR BOOK

app.get("/books",async(req,res)=>{
    try {
        const book=await books.find().lean().exec()
        return res.send(book)

    } catch (error) {
       return res.send(error)
    }
    
})

app.post("/books",async(req,res)=>{
    try {
        let book=await books.create(req.body)
        return res.send(book)
    } catch (error) {
     return res.send(error)
    }
    
})
app.get("/books/:id",async(req,res)=>{
    try {
        let book=await books.findById(req.params.id).populate("sectionId")
        return res.send(book)
    } catch (error) {
     return res.send(error)
    }
})
//   CRUD OPERATIONS FOR author
app.get("/authors",async(req,res)=>{
    try {
        const author=await authors.find().lean().exec()
        return res.send(author)

    } catch (error) {
       return res.send(error)
    }
    
})

app.post("/authors",async(req,res)=>{
    try {
        let author=await authors.create(req.body)
        return res.send(author)
    } catch (error) {
     return res.send(error)
    }
    
})

// CRUD OPERATIONS FOR bookauthor

app.get("/bookauthors",async(req,res)=>{
    try {
        const bookauthors=await Bookauthor.find().populate("userId")
        .populate({path:"bookId",select:[],populate:{path:"sectionId",select:[]}
}).lean().exec()
        return res.send(bookauthors)
    } catch (error) {
        console.log(error)
    }
    

})

app.post("/bookauthors",async(req,res)=>{
    try {
        const bookauthors=await Bookauthor.create(req.body)
        return res.send(bookauthors)
    } catch (error) {
        console.log(error)
    }
  
})

app.get("/bookauthors/:id",async(req,res)=>{
  try {
    const bookauthors=await Bookauthor.findById(req.params.id).populate("userId").populate("bookId")
    return res.send(bookauthors)
  } catch (error) {
      console.log(error)
  }
})

app.get("/bookauthors/:id",async(req,res)=>{
    try {
      const bookauthors=await Bookauthor.findById(req.params.id).populate({path:"bookId",select:[],populate:{path:"sectionId",select:[]}}).lean().exec()
      return res.send(bookauthors)
    } catch (error) {
        console.log(error)
    }
  })

const checkoutSchema=new mongoose.Schema({
  userId:{
      type:mongoose.Schema.Types.ObjectId,
  ref:"user",
  required:true
  },
  bookId:{
    type:mongoose.Schema.Types.ObjectId,
ref:"book",
required:true
},
checkouttime:{type:String,required:true},
checkintime:{type:String,required:true}
})

const Checkout=mongoose.model("checkouts",checkoutSchema)

app.get("/checkouts",async(req,res)=>{
   try {
    const checkout=await Checkout.find().lean().exec()
    return res.send(checkout)
   } catch (error) {
       console.log(error)
   }
})

app.post("/checkouts",async(req,res)=>{
    try {
        const checkout=await Checkout.create(req.body)
        return res.send(checkout)
    } catch (error) {
        console.log(error)
    }
})
app.listen(4000,async()=>{
    try {
        await connect()
        console.log("live at 4000")
    } catch (error) {
        console.log(error)
    }
})
