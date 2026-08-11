import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender:{
            type:mongoose.Schema.type.ObjectId,
            ref:"User",
            required:true,
        },
        receiver:{
            type:mongoose.Schema.type.ObjectId,
            ref:"User",
            required:true,
        },
        image:{
            type:String,
            default:"",
        },
    },
    {
        timestamps:true,
    }
);

const Message = mongoose.model("Message",messageSchema);
export const Message;