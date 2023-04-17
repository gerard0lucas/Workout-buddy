const Workout = require("../models/workoutmodel")

// get workouts....................................
const getworkouts = async(req,res)=>{
    const {email} = req.user;
    console.log({email});
    try {
        const workout = await Workout.find({email}).sort({createdAt: -1});
        res.status(201).json( workout );
    } catch (err) {
        res.status(404).json({
            errorMsg: err.message,
        });
    }
}

// get workouts by id..............................
const findworkout = async(req,res)=>{
    try {
        const workout = await Workout.findById(req.params.id);
        if(!workout){
            res.status(404).json({
                errorMsg:"no workout found",
            });  
        }else{
            res.status(201).json( workout );
        }
        
    } catch (err) {
        res.status(404).json({
            errorMsg: err.message,
        });
    }
}


// post workouts...................................
const postworkouts = async(req,res)=>{
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json( workout );
    } catch (err) {
        res.status(404).json({
            errorMsg: err.message,
        });
    }
}

// delete workouts by id..............................
const deleteworkout = async(req,res)=>{
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        res.status(201).json(workout);
    } catch (err) {
        res.status(404).json({
            errorMsg: err.message,
        });
    }
}


// update workouts by id..............................
const updateworkout = async(req,res)=>{
    try {
        const workout = await Workout.findById(req.params.id);
        if(!workout){
            res.status(404).json({
                errorMsg:"no workout found",
            });  
        }else{
            const updatedworkout = await Workout.findByIdAndUpdate(req.params.id,{...req.body});
            res.status(201).json(`Updated ${req.params.id}`);
        }
        
    } catch (err) {
        res.status(404).json({
            errorMsg: err.message,
        });
    }
}

// ..................................................................
module.exports = {getworkouts,findworkout,postworkouts,deleteworkout,updateworkout};
