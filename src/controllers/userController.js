import User from "../models/User.js";

export const searchUsers = async (req,res) =>{
    try {
        const {query} =req.query;

        if(!query || query.trim() === ""){
            return res.status(400).json({
                success:false,
                message:"Search query is required",
            });
        }

    const users = await User.find({
        $or:[
            {
                username:{
                    $regex: query,
                    $options:"i"
                },
            },
            {
                fullName:{
                    $regex: query,
                    $options:"i"
                },
            },
            {
                email:{
                    $regex: query,
                    $options:"i"
                },
            },
        ],

        _id:{
            $ne:req.user._id,
        },
    })
      .select("-password")
      .limit(20);

      res.status(200).json({
        success:true,
        users,
      })
    } catch (error) {
        console.error("Search Users Error:",error.message);

        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
};