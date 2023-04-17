const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const requireAuth =async(req, res,next)=>{

    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({message:"authorization token required "})
    }

    const token = authorization.split(" ")[1]
    try{
        const {_id} = jwt.verify(token, process.env.secret)
        // console.log({_id});
        req.user = await User.findOne({_id}).select("email")
        
        next()
    }catch(err){
        console.log(err);
        return res.status(401).json({message:"not authorised request"})
    }



}
module.exports = requireAuth;