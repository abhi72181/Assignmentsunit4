var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()
const passport=require("passport")
const User=require("../models/users.model")
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2022/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    //    console.log( profile)
    //   console.log( uuidv4())
    let user=await User.findOne({email:profile?._json?.email})
    if(!user){
        user=await User.create({
            name:profile._json.name,
            email: profile._json.email,
            password:uuidv4(),
            role:["customer"]
        })
    }
    console.log(user)
    return done(null,user);
  }
));

module.exports=passport