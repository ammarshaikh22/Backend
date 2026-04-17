import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
    },

    date: Date,

    status: {
      type: String,
      enum: ["present", "absent", "late", "leave"],
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
export default Attendance;