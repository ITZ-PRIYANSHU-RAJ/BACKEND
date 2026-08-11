import { Message } from "../models/Message.js";
import User from "../models/User.js"
export const sendMessage = async(req,res)=>{
    try {
        const{receiverId,text,image}=req.body;
        const senderId = req.user._id;

        if(!receiverId){
            return res.status(400).json({
                success:false,
                message:"Receiver ID is required",
            });
        }
        if(!text && !image){
            return res.status(400).json({
                success:false,
                message:"Message cannot be empty",
            });
        }
        const receiver = await User.findById(receiverId);

        if(!receiver){
            return res.status(404).json({
                success:false,
                message:"Receiver not found",
            });
        }

        const message = await Message.create({
            sender:senderId,
            receiver:receiverId,
            text:text || "",
            image:image || "",
        });

        await message.populate([
            {
                path:"sender",
                select:"-password",
            },
            {
                path:"receiver",
                select:"-password",
            },
        ]);

        res.status(201).json({
            success:true,
            message:"Message sent successfully",
            data:message,
        })
    } catch (error) {
        console.error("Send Message Error:",error.message);

        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
};