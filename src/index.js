// require("dotenv").config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";


// import express from "express";
// const app = express()

// ( async () => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
//       app.on("error", (error) => {
//         console.log("error:", error);
//         throw error
//       })

//       app.listen(process.env.PORT, () => {
//         console.log(`aPP IS lISTEN ON PORT ${process.env.PORT}`);
        
//       })
//     } 
//     catch (error) {
//       console.log("error:" , error);
//          throw error
//     }
// })()


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("Mongodb connection failed !!!!", err);
    
})