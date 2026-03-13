import mongoose from "mongoose";

const dailyLoginCountSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },

  loginStudents: [
    {
      registrationNo: String,
      loginTime: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.DailyLoginCount ||
  mongoose.model("DailyLoginCount", dailyLoginCountSchema);