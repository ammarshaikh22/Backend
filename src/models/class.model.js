import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    name: String, // Class A
    section: String, // A-1
    grade: String, // 1st

    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teachers",
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
      },
    ],

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subjects",
      },
    ],

    schedule: [
      {
        day: String,
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subjects",
        },
        startTime: String,
        endTime: String,
      },
    ],
  },
  { timestamps: true }
);

const Classes = mongoose.models.Classes || mongoose.model("Classes", ClassSchema);
export default Classes;