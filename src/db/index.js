import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
export default async () => {
    try {
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connnected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error ", error);
        process.exit(1);

    }
}