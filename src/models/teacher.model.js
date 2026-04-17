import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    // Basic Info
    profilePicture: String,
    phone: String,
    gender: String,
    age: Number,
    address: String,
    dateOfBirth: Date,

    // Subjects (Relation)
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subjects",
      },
    ],

    // Classes (Relation)
    classes: [
      {
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Classes",
        },
        section: String,
      },
    ],

    // Education (can stay embedded ✅)
    education: [
      {
        degree: String,
        institute: String,
        year: String,
        grade: String,
      },
    ],

    // Experience (can stay embedded ✅)
    experience: [
      {
        school: String,
        years: String,
        role: String,
        subjectsTaught: [String],
        remarks: String,
      },
    ],

    // Salary (ONLY basic info here)
    salary: {
      type: Number,
    },

    paymentType: {
      type: String,
      enum: ["monthly", "bi-weekly", "weekly"],
    },

    paymentMethod: {
      type: String,
      enum: ["bank transfer", "check", "cash", "mobile payment"],
    },

    // Performance
    performance: {
      rating: Number,
      feedback: String,
    },

    joiningDate: Date,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.models.Teachers || mongoose.model("Teachers", TeacherSchema);

export default Teacher;