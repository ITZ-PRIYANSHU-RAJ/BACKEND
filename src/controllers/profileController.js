import User from "../models/User.js"
export const updateProfile = async(req,res)=>{
    try{
        const{fullName, username, bio, profilePic}= req.body; //update profile

        const userId = req.user._id;

        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found",
            });
        }
        if(fullName !== undefined){
            user.fullName = fullName;
        }
        if(username !== undefined){
            user.username = username;
        }
        if(bio !== undefined){
            user.bio = bio;
        }
        if(profilePic !== undefined){
            user.profilePic = profilePic;

            await user.save();
        }

    }
}