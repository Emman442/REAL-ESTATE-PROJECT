const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config()

const userRouter = require("./routes/userRoutes")
const authRouter = require("./routes/authRoutes")
const app= express() 
app.use(cors()) 
app.use(morgan("dev"))
app.use(express.json())

const PORT = 3000

const DB = process.env.MONGO_URI

mongoose.connect(DB, {useNewUrlParser: true}).then(con=>{
    console.log("Database Connected Successfully!!")
})


app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


app.use((err, req,res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


app.listen(PORT, ()=>{
    console.log("server listening at port 3000")
})