import jwt from 'jsonwebtoken';


const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token",
            });
        }
    }
}