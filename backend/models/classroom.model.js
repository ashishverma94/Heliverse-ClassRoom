import mongoose from "mongoose";

const classRoom = new mongoose.Schema({
  _class: { type: String },
  day: String,
  teacher: String,
  teacherId: String,
  startTime: String,
  endTime: String,
  timeTables: [{ cStartTime: String, cEndTime: String }],
});

const classRoomModel = mongoose.model("Classroom", classRoom);
export default classRoomModel;
