import dotenv from "dotenv/config"
import express from 'express'
import connectDB from './db/index.js'

const app = express();
connectDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
}).catch(()=>{
    console.log("Mongo db connection failed !!!",err)
})