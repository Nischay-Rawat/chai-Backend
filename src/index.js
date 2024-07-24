import dotenv from "dotenv/config"
import connectDB from './db/index.js'
import { app } from './app.js'
connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
    app.on('close', () => {
        process.exit(1);
    })
}).catch(() => {
    console.log("Mongo db connection failed !!!", err)
})