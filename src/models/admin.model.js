import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
    },

    designation: {
      type: String,
      default: "Administrator",
    },

    permissions: {
      manageTeachers: { type: Boolean, default: true },
      manageStudents: { type: Boolean, default: true },
      manageAdmins: { type: Boolean, default: true },
      manageClasses: { type: Boolean, default: true },
      manageSubjects: { type: Boolean, default: true },
      manageAttendance: { type: Boolean, default: true },
      manageExams: { type: Boolean, default: true },
      manageResults: { type: Boolean, default: true },
      manageFees: { type: Boolean, default: true },
      manageSalary: { type: Boolean, default: true },
      manageAnnouncements: { type: Boolean, default: true },
      manageRequests: { type: Boolean, default: true },
      manageSettings: { type: Boolean, default: true },
      canDeleteUsers: { type: Boolean, default: true },
    },

    pendingRequests: {
      teachers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
      students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },

    approvedTeachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teachers",
      },
    ],

    approvedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
      },
    ],

    rejectedUsers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        reason: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    totalStats: {
      totalTeachers: {
        type: Number,
        default: 0,
      },
      totalStudents: {
        type: Number,
        default: 0,
      },
      totalClasses: {
        type: Number,
        default: 0,
      },
      totalSubjects: {
        type: Number,
        default: 0,
      },
      totalFeeCollected: {
        type: Number,
        default: 0,
      },
      totalPendingFee: {
        type: Number,
        default: 0,
      },
      totalSalaryPaid: {
        type: Number,
        default: 0,
      },
    },

    announcements: [
      {
        title: String,
        message: String,
        forRole: {
          type: String,
          enum: ["all", "teacher", "student"],
          default: "all",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    notifications: [
      {
        title: String,
        message: String,
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    activityLogs: [
      {
        action: String,
        performedOn: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        details: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    systemSettings: {
      schoolName: String,
      schoolLogo: String,
      schoolAddress: String,
      schoolPhone: String,
      schoolEmail: String,
      feeCurrency: {
        type: String,
        default: "PKR",
      },
      sessionYear: String,
    },

    dashboardCards: {
      todayAttendance: {
        type: Number,
        default: 0,
      },
      pendingApprovals: {
        type: Number,
        default: 0,
      },
      feeDueStudents: {
        type: Number,
        default: 0,
      },
    },

    lastLogin: Date,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;