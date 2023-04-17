const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
require("dotenv").config()
const jwt = require('jsonwebtoken')

// ........................Creating a token................................
const cerateToken = (_id) =>{
   return jwt.sign({_id}, process.env.secret, {expiresIn:'3d'} )
}

// .........................Login user.....................................
const loginUser =async (req,res)=>{
    const {email,password} = req.body
    try{
        if(!email || !password ){
            res.status(400)
            throw Error("plaese add all feilds")
        }
        
        const exists = await User.findOne({email})
         if(!exists){
            throw Error("Invalid Email")
        }
        const match = await bcrypt.compare(password,exists.password )
        if(!match){
            throw Error("incorrect password") 
        }
        const token = cerateToken(exists._id)
        res.status(200).json({email,token})
    }catch(Error){
        res.status(400).json({message: Error.message})
    }
}

// .........................Register user.....................................
const signinUser = async (req,res)=>{
    const {email,password} = req.body
    
    try{
        if(!email || !password ){
            res.status(400)
            throw Error("plaese add all feilds")
        }
        if(!validator.isEmail(email)){
            res.status(400)
            throw Error("plaese enter valid email")
        }

        const exists = await User.findOne({email})
         if(exists){
        throw Error("email already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt) 


        const user = await User.create({email,password:hash})
        // ...........asigning token......................
        const token = cerateToken(user._id)
        
        res.status(200).json({email,token})
    }catch(Error){
        res.status(400).json({message: Error.message})
    }
}



module.exports ={loginUser,signinUser}