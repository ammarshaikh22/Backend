import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    profilePicture: String,
    gender: String,
    phone: String,
    age: Number,
    address: String,
    dateOfBirth: Date,

    classInfo: {
      className: String,
      section: String,
      rollNumber: String,
    },

    subjects: [String],

    attendance: [
      {
        date: Date,
        status: String,
        enum: ["present", "absent", "late", "leave", "half-day"],
      },
    ],

    results: [
      {
        subject: String,
        marks: Number,
        totalMarks: Number,
        examType: String,
      },
    ],

    fee: [
      {
        month: String,
        amount: Number,
        status: String,
        enum: ["paid", "unpaid"],
        date: Date,
        feeMethod: String,
        enum: ["bank transfer", "check", "cash", "mobile payment"],
      },
    ],

    parent: {
      name: String,
      phone: String,
    },

    admissionDate: Date,

    status: {
      type: String,
      default: "approved",
    },
  },
  { timestamps: true },
);

const Student =
  mongoose.models.Students || mongoose.model("Students", StudentSchema);

export default Student;
