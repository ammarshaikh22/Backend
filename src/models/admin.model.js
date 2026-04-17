import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    profilePicture: String,
    phone: String,
    designation: {
      type: String,
      default: "Administrator",
    },

    permissions: {
      manageUsers: { type: Boolean, default: true },
      manageClasses: { type: Boolean, default: true },
      manageSubjects: { type: Boolean, default: true },
      manageAttendance: { type: Boolean, default: true },
      manageFinance: { type: Boolean, default: true },
    },

    pendingRequests: {
      teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
      students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    },

    rejectedUsers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        reason: String,
        date: { type: Date, default: Date.now },
      },
    ],

    totalStats: {
      totalTeachers: Number,
      totalStudents: Number,
      totalClasses: Number,
      totalSubjects: Number,
      totalFeeCollected: Number,
      totalSalaryPaid: Number,
    },

    systemSettings: {
      schoolName: String,
      schoolLogo: String,
      sessionYear: String,
    },

    lastLogin: Date,
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;