import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection= await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    }
    catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}