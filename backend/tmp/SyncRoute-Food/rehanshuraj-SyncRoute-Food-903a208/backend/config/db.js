import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB:", conn.connection.name);
  } catch (err) {
    console.log("DB error:", err.message);
  }
};

export default connectdb;
