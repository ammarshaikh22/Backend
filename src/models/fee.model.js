import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },

    amount: Number,
    month: String,

    status: {
      type: String,
      enum: ["paid", "unpaid"],
    },

    paidDate: Date,
  },
  { timestamps: true }
);

const Fees = mongoose.models.Fees || mongoose.model("Fees", FeeSchema);
export default Fees;