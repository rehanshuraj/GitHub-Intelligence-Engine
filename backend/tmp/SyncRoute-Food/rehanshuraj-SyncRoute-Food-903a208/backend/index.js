import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectdb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";


//creating server 
const app = express();
const port= process.env.PORT || 5000

//global middlewares
app.use(cors({
    //yaha pe hum wo url(frontend urls) daalenge jo backened ko hit krega
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes); //route middlewares that api/auth use because in auth.routes.js we have defined /signup,/login,/logout routes 
app.use("/api/user",userRoutes); //route middlewares



//listening the server
app.listen(port,()=>{
    connectdb();
    console.log(`server started at ${port}`)
})

