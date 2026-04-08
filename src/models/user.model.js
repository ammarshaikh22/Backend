import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    otp_token: String,
    otp_expiry: Date,
    forgotPassword: String,
    forgotPasswordExpiry: Date,
    verification: {
      type: String,
      enum: ["verified", "unverified"],
      default: "unverified",
    },
    email_type:{
      type: String,
      enum: ["VERIFY", "FORGOT"],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;
