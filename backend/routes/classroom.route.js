import express from "express";
import {
  assignTeacher,
  getClassRooms,
  createClassRoom,
  updateClassRoom,
  deleteClassRoom,
  createTimetable,
  deleteTimeTable,
  getClassroomByClass,
  getClassroomByTeacherId,
} from "../controllers/classroom.controller.js";

const classRoomRouter = express.Router();

classRoomRouter.get("/get-classrooms/:c", getClassRooms);
classRoomRouter.put("/update-classroom/:id", updateClassRoom);
classRoomRouter.get("/get-classroom-teacher/:id", getClassroomByTeacherId);
classRoomRouter.get("/get-classroom-class/:c", getClassroomByClass);
classRoomRouter.post("/create-classroom", createClassRoom);
classRoomRouter.post("/assign-teacher", assignTeacher);
classRoomRouter.post("/create-timetable", createTimetable);
classRoomRouter.delete("/delete-classroom/:id", deleteClassRoom);
classRoomRouter.delete("/delete-timetable/:cId/:tId", deleteTimeTable);

export default classRoomRouter;
