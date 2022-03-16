/*
const { body, validationResult } = require('express-validator');

app.post(
  '/user',
  // username must be an email
  body('username').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user));
  },
);
*/
 const express=require("express")

const router=express.Router()
const { body, validationResult } = require('express-validator')
// const router=express.Router()
const User=require("../models/usermodel")

router.post("/",
body("first_name").not().isEmpty().withMessage("first name is empty"),
body("last_name").not().isEmpty().withMessage("last name is empty"),
 body("email").not().isEmpty().isEmail(),
 body("pincode").not().isEmpty().isLength({min:6,max:6}),
 body("age").not().isEmpty().custom((value)=>{
     
     if(value<1||value>100){
        throw new Error("age should be between 1 to 100")
     }
     return true;
 }),

 body("gender").not().isEmpty().custom((value)=>{
     
  if(value=="male"||value=="female"||value=="others"){
     return true
  }
  throw new Error("gender should be specified")
  
}),
async (req,res)=>{
    try {
        const errors = validationResult(req);
        console.log(body("first_name"))
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const user=await User.create(req.body)
        return res.send(user)
    } catch (error) {
        console.log(error)
    }
}

 );

module.exports=router;