import User from "../models/user.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import sendMail from "../utils/mailer.js";

// Signup as student
export const Signup_as_student = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: "student",
      otp_expiry: new Date(Date.now() + 10 * 60 * 1000),
    });
    await newUser.save();
    const user_id = newUser._id.toString();
    const mail = await sendMail({
      email: email,
      email_type: "VERIFY",
      userId: user_id,
    });
    if (mail) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }
    res.status(201).json({
      message:
        "Student registered. check your email for OTP to verify your account",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signup as teacher
export const Signup_as_teacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: "teacher",
      otp_expiry: new Date(Date.now() + 10 * 60 * 1000),
    });
    await newUser.save();
    const user_id = newUser._id.toString();
    const mail = await sendMail({
      email: email,
      email_type: "VERIFY",
      userId: user_id,
    });
    if (mail) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }
    res.status(201).json({
      message:
        "Teacher registered. check your email for OTP to verify your account",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Please provide email and OTP" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.otp_token !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otp_expiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    user.verification = "verified";
    user.otp_token = null;
    user.otp_expiry = null;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.verification === "unverified") {
      return res.status(400).json({
        message: "Please verify your email to login",
      });
    }

    if (user.status === "pending") {
      return res.status(400).json({
        message: "Your account is pending approval from admin",
      });
    }

    if (user.status === "rejected") {
      return res.status(400).json({
        message: "Your account has been rejected by admin",
      });
    }

    const payload = {
      userId: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload profile picture
export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 1. User ko find karo token se
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Role check karo aur respective schema update karo
    let updatedUser;
    const profilePicUrl = req.file.path || req.file.url;
    if (user.status !== "approved") {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet" });
    }
    if (user.role === "teacher") {
      updatedUser = await Teacher.findOneAndUpdate(
        { userId: user._id },
        { profilePicture: profilePicUrl },
        { new: true },
      );
    } else if (user.role === "student") {
      updatedUser = await Student.findOneAndUpdate(
        { userId: user._id },
        { profilePicture: profilePicUrl },
        { new: true },
      );
    } else if (user.role === "admin") {
      updatedUser = await Admin.findOneAndUpdate(
        { userId: user._id },
        { profilePicture: profilePicUrl },
        { new: true },
      );
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
