
import { connect, disconnect } from "mongoose";

async function connectToDatabase () {
    try {
        await connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB successfully')
    } catch (error) {
        console.log(error)
        throw new Error("Error in connecting to MongoDB")
    }
}

async function disconnectToDatabase () {
    try {
        await disconnect();
    } catch (error) {
        console.log(error)
        throw new Error("Error in disconnecting to MongoDB")
    }
}


export {connectToDatabase, disconnectToDatabase}