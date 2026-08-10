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

            const updateUser = {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                bio: user.bio,
                profilePic: user.profilePic,
            };
            res.status(200).json({
             success:true,
             message:"Profile updated successfully",
             user:updateUser,
            });
        }
    }catch(error){
            console.error("Update Profile Error:",error.message);

            res.status(500).json({
                success:false,
                message:"Internal Server Error",
            });
        }
}