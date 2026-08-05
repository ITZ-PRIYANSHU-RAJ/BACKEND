import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";


const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });

})
.catch(err => console.log(err));