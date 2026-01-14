import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';

import cloudinary from "../config/cloudinary.js";


export const createUserController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();

        delete user._doc.password;

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const loginController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                errors: 'Invalid credentials'
            })
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                errors: 'Invalid credentials'
            })
        }

        const token = await user.generateJWT();

        delete user._doc.password;

        res.status(200).json({ user, token });


    } catch (err) {

        console.log(err);

        res.status(400).send(err.message);
    }
}

export const profileController = async (req, res) => {

    res.status(200).json({
        user: req.user
    });

}

export const logoutController = async (req, res) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;

    // ✅ Only blacklist if token exists
    if (token) {
      await redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    }

    // ✅ Always clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      //secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    return res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (err) {
    console.error("Logout error:", err);

    // ✅ Logout should NEVER fail
    return res.status(200).json({
      message: "Logged out (fallback)"
    });
  }
};


export const getAllUsersController = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });

        return res.status(200).json({
            users: allUsers
        })

    } catch (err) {

        console.log(err)

        res.status(400).json({ error: err.message })

    }
}

export const uploadAvatar = async (req,res)=>{
    try{
        //file check
        if(!req.file){
            return res.status(400).json({message:"No File Uploaded"});
        }
        //convert buffer -> base64
        const filestr =`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        
        //upload to cloudinary
        const uploadRes=await cloudinary.uploader.upload(filestr,{
            folder:"avatars",
        });

        //updating user db
        const user= await userModel.findByIdAndUpdate(
            req.user._id,
            { avatar:uploadRes.secure_url},
            {new:true}
        );

        res.json({
            message:"Avatar updated",
            avatar:user.avatar,
        });
    }catch(err){
       res.status(500).json({message: err.message});
    }
}
export const updateProfile = async (req, res) => {
  const { name, bio } = req.body;

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { name, bio },
    { new: true }
  );

  res.json(user);
};
