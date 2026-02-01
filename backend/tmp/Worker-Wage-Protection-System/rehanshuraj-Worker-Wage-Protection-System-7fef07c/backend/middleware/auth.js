import jwt from "jsonwebtoken";

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "notoken"});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch{
        res.status(401).json({message: "Invalid token"});
    }
};

export default auth;