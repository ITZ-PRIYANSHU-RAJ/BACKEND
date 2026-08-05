import generateToken from "../lib/generateToken";
import User from "../models/User.js"
import bcrypt from "bcryptjs" 

export const registerUser = async(req,res)=>{
    try{
        const{fullname,email,password}=req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        if (password.length<6) {
            return res.status(400).json({
                success:false,
                message:"password must be at least 6 characters"
            })
        }

        const existingUser= await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already exists",
            })
        }

        const salt= await bcrypt.hash(password,salt);

        const user = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        generateToken(user._id,res);

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
            },
        });
    }catch(error){
        console.error("Register error:",error.message);

        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
};



export const loginUser = async(req,res) =>{
    try {
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required",
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        const isPasswordCorrect = await bcrypt.comapre(
            password,
            user.password
        );
        if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:"Incorrect password",
            });
        }

        generateToken(user._id,res);

        res.status(200).json({
            success:true,
            message:"Login successful",
            user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
            }
        });
    } catch (error) {
        console.error("Login Error:",error.message);

        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
};