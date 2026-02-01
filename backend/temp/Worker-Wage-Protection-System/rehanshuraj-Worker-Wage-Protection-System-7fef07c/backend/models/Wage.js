import mongoose from "mongoose";

const wageSchema  = new mongoose.Schema({
    worker:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    amount : Number,
    paid:{
        type: Boolean,
        default: false,
    },
    paymentDate: Date
},{timestamps: true})

export default mongoose.model("Wage",wageSchema);
