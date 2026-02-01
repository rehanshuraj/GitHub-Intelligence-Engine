import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req,res)=>{
    const {name,phone,role} = req.body;
    let user = await User.findOne({phone});
    if(!user){
        user = await User.create({name,phone,role})
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    },
    process.env.JWT_SECRET);
    res.json({token,user});
}