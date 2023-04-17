const mongoose = require("mongoose");

const Schema = mongoose.Schema

const workoutschema= new Schema({
    title:{
        type: String,
        requirted: true
    },
    reps:{
        type: Number,
        requirted: true
    },
    load:{
        type: Number,
        requirted: true
    },
    email:{
        type: String,
        requirted: true
    }
},{timestamps:true})

module.exports = mongoose.model("Workout",workoutschema)