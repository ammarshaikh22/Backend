import User from '../models/user.model.js';
import Teacher from '../models/teacher.model.js';
import Student from '../models/student.model.js';
import Admin from '../models/admin.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await user.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === role){
      return res.status(200).json({
        message: "Role is already assigned to the user"
      })
    }
    await User.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).json({
      message: "Role updated",
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating role" });
  }
};

export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending users" });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.status === "approved") {
      return res.status(200).json({ message: "User is already approved" });
    }
    if (user.status === "rejected") {
      return res.status(400).json({ message: "Rejected user cannot be approved" });
    }
    user.status = "approved";
    await user.save();

    if (user.role === "teacher" && (await Teacher.findOne({ userId: user._id })) === null) {
      await Teacher.create({
        userId: user._id,
      });
    }

    if (user.role === "student" && (await Student.findOne({ userId: user._id })) === null) {
      await Student.create({
        userId: user._id,
      });
    }
    if (user.role === "admin" && (await Admin.findOne({ userId: user._id })) === null) {
      await Admin.create({
        userId: user._id,
      });
    }

    res.status(200).json({
      message: "User approved & profile created",
    });

  } catch (error) {
    res.status(500).json({ message: "Error approving user" });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
     const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.status === "rejected") {
      return res.status(200).json({ message: "User is already rejected" });
    }
    if (user.status === "approved") {
      return res.status(400).json({ message: "Approved user cannot be rejected" });
    }
    if (user.status === "pending") {
    await User.findByIdAndUpdate(id, {
      status: "rejected",
    });
  }
    res.status(200).json({
      message: "User rejected",
    });

  } catch (error) {
    res.status(500).json({ message: "Error rejecting user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.role === "admin"){
      await Admin.deleteOne({ userId: id });
    }

    if (user.role === "teacher") {
      await Teacher.deleteOne({ userId: id });
    }

    if (user.role === "student") {
      await Student.deleteOne({ userId: id });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User and related data deleted",
    });

  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

