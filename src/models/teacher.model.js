import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  profilePicture: String,
  phone: String,
  gender: String,
  age: Number,
  address: String,
  dateOfBirth: Date,

  subjects: [String],

  classes: [{
    className: String,
    section: String,
    teachingSubject: String,
  }],

  education: [{
    degree: String,
    institute: String,
    year: String,
    grade: String,
  }],

  experience: [{
    school: String,
    years: String,
    role: String,
    subjectsTaught: [String],
    remarks: String,
  }],

  salaryInfo: {
    amount: Number,
    paymentType: String, 
    enum: ["monthly", "bi-weekly", "weekly"],
    paymentMethod: String, 
    enum: ["bank transfer", "check", "cash", "mobile payment"],
    receivedSalary:[{
      month: String,
      amount: Number,
      date: Date,
      status: String,
      enum: ["paid", "unpaid"],
    }],
  },


  attendance: [{
    date: Date,
    status: String, 
    enum: ["present", "absent", "late", "leave", "half-day"],
  }],

  performance: {
    rating: Number,
    feedback: String,
  },

  joiningDate: Date,

  status: {
    type: String,
    default: "active",
  }
},
{ timestamps: true }
);

const Teacher = mongoose.models.Teachers || mongoose.model("Teachers", TeacherSchema);
export default Teacher;