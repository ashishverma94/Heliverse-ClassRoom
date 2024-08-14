import express from "express";
import {
  loginUser,
  deleteUser,
  createUser,
  updateUser,
  getAllUsers,
  getStudentsByClass,
  getUnassignedTeachers,
  getUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.put("/update-user", updateUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/get-user/:id", getUser);
userRouter.post("/get-all-users", getAllUsers);
userRouter.delete("/delete-user/:id/:role", deleteUser);
userRouter.get("/get-students/:c", getStudentsByClass);
userRouter.get("/get-unassigned-teachers", getUnassignedTeachers);

export default userRouter;
