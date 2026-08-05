import jwt from 'jsonwebtoken';

const generateToken = (user) =>{
    return token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {
            expiresIn:"15d",
        }
    )


res.cookies("jwt",token,{
    maxAge: 7*24*60*60*1000, 
    httpOnly:true,
    secure:process.env.NODE_ENV === "talksy",
    sameSite:"strict",
});

return token;
};

export default generateToken;