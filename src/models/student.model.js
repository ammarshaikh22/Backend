import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    // Basic Info
    profilePicture: String,
    gender: String,
    phone: String,
    age: Number,
    address: String,
    dateOfBirth: Date,

    // Class Relation (IMPORTANT)
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
    },

    section: String,
    rollNumber: String,

    // Subjects (relation)
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subjects",
      },
    ],

    // Parent Info
    parent: {
      name: String,
      phone: String,
    },

    admissionDate: Date,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Student = mongoose.models.Students || mongoose.model("Students", StudentSchema);

export default Student;
