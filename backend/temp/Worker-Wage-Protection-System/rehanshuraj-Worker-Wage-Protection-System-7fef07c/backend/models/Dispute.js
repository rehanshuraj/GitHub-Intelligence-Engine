import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema({
    worker:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    employer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reason: String,
    status:{
        type: String,
        enum: ["opne","resolved"],
        default: "open"
    }
},{timestamps:true})


export default mongoose.model("Dispute", disputeSchema);