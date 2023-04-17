const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    email:{
        type: String,
        requirted: [true, 'please add email'],
        unique:true
    },
    password:{
        type: String,
        requirted:[true, 'please add password']
    }
})



module.exports = mongoose.model('User',userSchema)