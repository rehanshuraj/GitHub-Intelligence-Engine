import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import Wage from "../models/Wage.js";

export const approveAttendance = async (req,res)=>{
    try{
      const {phone, hoursWorked} = req.body;
      if(!phone || !hoursWorked){
        return res.status(400).json({message: "Phone and hoursWorked are required"});
      }
      const worker = await User.findOne({phone,role:"employer"});
      if(!worker){
        return res.status(404).json({message: "worker not found"});
      }
      //now create attendance
      const attendance = await Attendance.create({
        phone,
        hoursWorked,
        date: new Date().toISOString().split('T')[0],
        approved: true
      })
      res.json({ message: "Attendence approved successfully", attendance } );
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }

}

export const payWage = async(req,res)=>{
    const wage = await Wage.findById(req.params.id);
    wage.paid = true;
    wage.paymentDate = new Date();
    await wage.save();
    res.json({message : "Payment completed"});
};