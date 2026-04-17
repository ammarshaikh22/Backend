import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: String, // Math
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teachers",
    },
  },
  { timestamps: true }
);

const Subjects = mongoose.models.Subjects || mongoose.model("Subjects", SubjectSchema);
export default Subjects;