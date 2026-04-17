import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teachers",
  },

  month: String,
  amount: Number,
  date: Date,

  status: {
    type: String,
    enum: ["paid", "unpaid"],
  },

  paymentMethod: {
    type: String,
    enum: ["bank transfer", "check", "cash", "mobile payment"],
  },
}, { timestamps: true });

const Salary = mongoose.models.Salary || mongoose.model("Salary", SalarySchema);
export default Salary;