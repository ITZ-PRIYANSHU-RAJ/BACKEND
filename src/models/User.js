import mongoose from "mongoose";

const User = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    lastSeen:{
        type:Date,
        default:Date.now
    }
})

export default User;