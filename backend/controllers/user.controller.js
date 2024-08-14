import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
dotenv.config();

//  USER REGISTRATION
export const createUser = async (req, res, next) => {
  try {
    let { name, email, password, role, mainRole, _class } = req.body;

    if (
      mainRole == "student" ||
      (mainRole === "teacher" && role === "principal")
    ) {
      return res
        .status(400)
        .json({ message: "You are not authorized to create account" });
    }

    if (role !== "student") {
      _class = -1;
    }

    const userEmail = await User.findOne({ email });

    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }
    if (!name) {
      return res.status(400).json({ message: "Please enter your name" });
    }
    if (!password) {
      return res.status(400).json({ message: "Please enter your password" });
    }
    if (userEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      _class,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10h",
    });

    return res.status(200).json({
      token: token,
      role: user.role,
      success: true,
      email: user.email,
      id: user._id,
      message: "Login successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

// UPDATE USER INFO
export const updateUser = async (req, res, next) => {
  try {
    const { newName, newEmail, id, role, newClass } = req.body;

    if (role === "student") {
      return res.status(400).json({
        message: "You are not authorized to update infomation of this user",
      });
    }

    if (!newName || !newEmail) {
      return res.status(400).json({
        message: "Please enter your new name and new email to update",
      });
    }

    const user = await User.findById(id);

    user.name = newName;
    user.email = newEmail;
    user._class = newClass;
    await user.save();

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const { role, type } = req.body;

    if (role === "student") {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to see this information.",
      });
    }

    try {
      const teachers = await User.find({ role: type });
      return res.json({ success: true, data: teachers });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = req.params.role;

    if (role !== "principal") {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to perform this action.",
      });
    }

    try {
      const result = await User.findByIdAndDelete(id);
      console.log(result);

      if (!result) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      return res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET STUDENT BY CLASS
export const getStudentsByClass = async (req, res, next) => {
  const { c } = req.params;
  try {
    const classStudents = await User.find({ _class: c });
    return res.json({ success: true, data: classStudents });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET TEACHERS
export const getUnassignedTeachers = async (req, res) => {
  try {
    const unassignedTeachers = await User.find({
      role: "teacher",
      assigned: false,
    }).select("_id name");

    res.status(201).json({
      success: true,
      unassignedTeachers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by their ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
