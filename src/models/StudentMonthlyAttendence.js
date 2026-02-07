import mongoose from "mongoose";

const monthlyAttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  month: {
    type: String, // Format: '2025-05'
    required: true,
  },
  days: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

monthlyAttendanceSchema.index({ studentId: 1, month: 1 }, { unique: true });

// Utility to generate initial blank attendance string
function generateEmptyAttendanceString(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate(); // JS: month is 1-based
  return 'P'.repeat(daysInMonth);
}

// Pre-validate hook to auto-fill days
monthlyAttendanceSchema.pre("validate", function (next) {
  if (!this.days) {
    const [year, month] = this.month.split("-").map(Number);
    this.days = generateEmptyAttendanceString(year, month);
  }
  next();
});

const StudentMonthlyAttendance =
  mongoose.models.MonthlyAttendance ||
  mongoose.model("MonthlyAttendance", monthlyAttendanceSchema);

export default StudentMonthlyAttendance;