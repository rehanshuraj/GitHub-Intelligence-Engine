import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import Dispute from "../models/Dispute.js";

export const approveAttendance = async (req,res)=>{
    try{
      const {phone, hoursWorked} = req.body;
      if(!phone || !hoursWorked){
        return res.status(400).json({message: "Phone and hoursWorked are required"});
      }
      const worker = await User.findOne({phone,role:"worker"});
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
        console.error(err);
    }

}



export const raiseDispute = async(req,res)=>{
    const {employerId, reason} = req.body;

    const dispute = await Dispute.create({
        worker: req.user.id,
        employer: employerId,
        reason
    });
    res.json(dispute)
};