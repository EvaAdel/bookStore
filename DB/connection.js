 // establish for database connection
 import mongoose from "mongoose";
export const connection_db = async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017/library");
    console.log("database connected");
}

    