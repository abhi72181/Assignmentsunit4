  const {validationResult}=require("express-validator")
  var jwt = require('jsonwebtoken')
  require('dotenv').config()

  const User=require("../models/users.model")
const register=async(req,res)=>{
    
        try {
         
          const errors = validationResult(req);
          
          if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
          }
           let user=await User.findOne({email:req.body.email})

           if(user){
             return res.status(400).send({message:"Email already exists"})
           }
            user = await User.create(req.body);
            var token = jwt.sign({ user }, process.env.secret)
          return res.send({user,token});
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }


const login=async(req,res)=>{
  try{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.send({error:errors.array()})
    }
    const user=await User.findOne({email:req.body.email})
    if(!user){
      return res.send({message:"wrong email or password"})
    } 
    const match=user.checkPassword(req.body.password)
    if(!match){
      return res.send({message:"wrong email or password"})
    }
    var token = jwt.sign({ user }, process.env.secret)
    return res.send({user,token});
  }
     catch (error) {
        return res.status(200).send(error.message)
    }
}

module.exports={register,login}