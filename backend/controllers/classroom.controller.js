import userModel from "../models/user.model.js";
import classRoomModel from "../models/classroom.model.js";

// CREATE CLASSROOM
export const createClassRoom = async (req, res) => {
  const { day, startTime, endTime, _class } = req.body;
  console.log(day, startTime, endTime, _class);

  const isClassRoomExist = await classRoomModel.findOne({ day, _class });
  console.log(isClassRoomExist);

  if (isClassRoomExist) {
    return res
      .status(400)
      .json({ message: "Class Room already exists on this day." });
  }

  try {
    const newClassRoom = {
      day,
      startTime,
      endTime,
      _class,
    };

    const classRoom = await classRoomModel.create(newClassRoom);

    res.status(201).json({
      success: true,
      classRoom,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ASSIGN TEACHER
export const assignTeacher = async (req, res) => {
  const { classRoomId, teacherId } = req.body;

  if (!classRoomId || !teacherId) {
    return res
      .status(400)
      .json({ message: "classId and teacherId are required" });
  }

  try {
    const teacher = await userModel.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    teacher.assigned = true;
    await teacher.save();

    const classRoom = await classRoomModel.findById(classRoomId);
    if (!classRoom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    classRoom.teacher = teacher.name;
    classRoom.teacherId = teacherId;
    await classRoom.save();

    res.status(200).json({ message: "Teacher assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET CLASSESS
export const getClassRooms = async (req, res) => {
  const { c } = req.params;
  try {
    const classes = await classRoomModel.find({ _class: c });
    res.status(201).json({
      success: true,
      classes,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE CLASSROOM
export const updateClassRoom = async (req, res) => {
  const { id } = req.params;
  const { day, startTime, endTime, _class } = req.body;

  try {
    const classRoom = await classRoomModel.findById(id);
    if (!classRoom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    if (day !== classRoom.day) {
      const isClassRoomExist = await classRoomModel.findOne({ day, _class });
      if (isClassRoomExist) {
        return res
          .status(400)
          .json({ message: "Class Room already exists on this day." });
      }
    }

    if (day !== undefined) classRoom.day = day;
    if (startTime !== undefined) classRoom.startTime = startTime;
    if (endTime !== undefined) classRoom.endTime = endTime;

    await classRoom.save();

    res.status(200).json({
      success: true,
      message: "Classroom updated successfully",
      classRoom,
    });
  } catch (error) {
    console.error("Error updating classroom:", error);
    res.status(400).json({ message: error.message });
  }
};

// DELETE CLASSROOM
export const deleteClassRoom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const classRoom = await classRoomModel.findById(id);
    if (!classRoom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    if (classRoom.teacherId) {
      const teacher = await userModel.findById(classRoom.teacherId);
      if (teacher) {
        teacher.assigned = false;
        await teacher.save();
      }
    }

    await classRoomModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Classroom deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting classroom:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET CLASSROOM BY TEACHER ID
export const getClassroomByTeacherId = async (req, res) => {
  try {
    const { id } = req.params;
    const classrooms = await classRoomModel.find({ teacherId: id });
    res.json(classrooms);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// CREATE TIMETABLE
export const createTimetable = async (req, res) => {
  const { classroomId, startTime, endTime, role } = req.body;
  console.log(classroomId, startTime, endTime, role);

  try {
    const classRoom = await classRoomModel.findById(classroomId);

    console.log(classRoom);
    if (role !== "teacher") {
      return res
        .status(404)
        .json({ message: "You are not authorized to perform this action" });
    }
    if (!classRoom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    if (!startTime || !endTime) {
      return res.status(404).json({ message: "All fields are required" });
    }
    if (!classRoom.teacher) {
      return res
        .status(404)
        .json({ message: "Teacher is not assigned in this classroom" });
    }

    classRoom.timeTables.push({ cStartTime: startTime, cEndTime: endTime });
    await classRoom.save();
    res
      .status(200)
      .json({ message: "Timetable added successfully", classRoom });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE TIMETABLE
export const deleteTimeTable = async (req, res) => {
  try {
    const { cId, tId } = req.params;

    const result = await classRoomModel.findByIdAndUpdate(
      cId,
      { $pull: { timeTables: { _id: tId } } },
      { new: true, useFindAndModify: false }
    );

    if (!result) {
      return res.status(404).json({ message: "ClassRoom not found" });
    }

    res.status(200).json({
      message: "TimeTable deleted successfully",
      classRoom: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CLASSROOM BY CLASS
export const getClassroomByClass = async (req, res) => {
  try {
    const { c } = req.params;
    const classRooms = await classRoomModel.find({ _class: c });

    res.status(200).json({
      message: "ClassRooms retrieved successfully",
      data: classRooms,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
