import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
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
    },
    bio:{
        type:String,
        default:""
    },
    status:{
        type:String,
        default:"Hey there! I am using ChatApp"
    },
    lastSeen:{
        type:Date,
        default:Date.now 
    }
})

export default mongoose.model("User", userSchema);