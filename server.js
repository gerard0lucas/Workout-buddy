require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const workoutRouter = require("./router/workoutRouter")
const userRouter = require('./router/userRouter')
const cors = require('cors')

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//  })

app.use(cors({
    origin:'https://dfee-wbve.onrender.com'
  }))

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

