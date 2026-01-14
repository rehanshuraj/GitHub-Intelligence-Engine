import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";
import { sendOtpMail } from "../utils/nodemailer.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, role, password } = req.body;

    // Check missing fields
    if (!fullName || !email || !mobileNumber || !role || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validation
    if (password.length< 4) {
      return res.status(400).json({ message: "Password must be 4 characters or more" });
    }

    if (mobileNumber.length !== 10) {
      return res.status(400).json({ message: "Mobile number must be 10 digits" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      fullName,
      email,
      mobileNumber,
      role,
      password: hashedPassword,
    });

    // Generate token
    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("Signup Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const login = async (req,res)=>{
    try{


      const {email,password} = req.body; 
    
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({message:"user does not exist"});
      }

      const isPasswordMatch = await bcrypt.compare(password,user.password);

      if(!isPasswordMatch){
        return res.status(401).json({message:"password is wrong"})
      }


      const token = await generateToken(user._id); //har ek id ke name se ek tokengenerate hogyi
      res.cookie("token",token,{
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000, //in millisecond
        httpOnly:true
      })

      return res.status(200).json(user)

    }catch (error){
        return res.status(500).json(`login error ${error}`)
    }
}

export const logout = async (req,res)=>{
    try{
       res.clearCookie("token")
       return res.status(200).json({message: "user logout successfully"})
    }catch(error){
        return res.status(500).json(`error in logout ${error}`)
    }
}

export const sendOtp=async(req,res)=>{
  try{
    const {email}=req.body;
    const user= await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"user does not exist"})
    }
    const otp= Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp=otp;
    user.optExpiry= Date.now()+10*60*1000; //10 minutes
    await user.save();

    await sendOtpMail(email,otp);
    return res.status(200).json({message:"otp sent to your email"})
  }catch(error){
    return res.status(500).json(`error in sending otp ${error}`)
  }
}

export const verifyOtp=async(req,res)=>{
  try{
    const {email,otp}=req.body;
    const user= await User.findOne({email});  
    if(!user || user.resetOtp!==otp || user.optExpiry < Date.now()){
      return res.status(400).json({message:"user does not exist"})
    }
    user.isOtpVerified=true;
    user.resetOtp=undefined;
    user.optExpiry=undefined;
    await user.save();
    return res.status(200).json({message:"otp verified successfully"})
  }catch(error){
    return res.status(500).json(`error in verifying otp ${error}`)
  }
}

export const resetPassword=async(req,res)=>{
  try{
    const {email,newPassword}=req.body;
    const user= await User.findOne({email});  
    if(!user || !user.isOtpVerified){
      return res.status(400).json({message:"unauthorized request"})
    }
    const hashedPassword= await bcrypt.hash(newPassword,10);
    user.password= hashedPassword;
    user.isOtpVerified=false;
    await user.save();
    return res.status(200).json({message:"password reset successfully"})
  }catch(error){
    return res.status(500).json(`error in resetting password ${error}`)
  } 
}

export const googleAuthCallback= async(req,res)=>{
  try{
    const {fullName,email,mobileNumber,role}= req.body;
    let user= await User.findOne({email});
    if(!user){
      user= await User.create({
        fullName,
        email,
        mobileNumber,
        role
      });
    }
      // Generate token
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    console.log("Google Auth successful:", user);
    return res.status(201).json(user);
    
    
  }catch(error){
    console.log("Google Auth Error:", error);
    return res.status(500).json(`error in google auth callback ${error}`)
  } 
}