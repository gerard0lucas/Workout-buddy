require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const workoutRouter = require("./router/workoutRouter")
const userRouter = require('./router/userRouter')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/users",userRouter)

app.use("/api/workouts",workoutRouter)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    app.listen(process.env.port,()=>{
        console.log("server running on port",process.env.port);
        console.log(mongoose.connection.host);
    })
})
.catch((e)=>{
    console.log(e);
})

