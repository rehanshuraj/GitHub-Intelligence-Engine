import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    phone:{
        type: String,
        required: true
    },
    date: String,
    hoursWorked: Number,
    approved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
