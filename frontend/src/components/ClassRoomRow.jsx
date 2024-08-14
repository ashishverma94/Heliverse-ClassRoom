import axios from "axios";
import DOMAIN_URL from "../utils/url";
import { toast } from "react-toastify";
import { timesArray } from "../utils/data";
import RedStar from "../components/RedStar";
import { convertTime } from "../utils/function";
import React, { useEffect, useState } from "react";

const ClassRoomRow = ({
  day,
  startTime,
  endTime,
  teacher,
  classRoomId,
  currClass,
  setCurrClass,
  timeTable,
}) => {
  // STATE TO ASSIGN TEACHER
  const [openAssignPopup, setOpenAssignPopup] = useState(false);
  const [loadingAT, setLoadingAT] = useState(false);
  const [unassignedTeachers, setUnassignedTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  // STATE TO UPDATE CLASSROOM
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [newDay, setNewDay] = useState(day);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [newEndTime, setNewEndTime] = useState(endTime);
  const [errMsg, setErrMsg] = useState("");
  const [loadingUp, setLoadingUp] = useState(false);
  // STATE TO DELETE CLASSROOM
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [loadingDl, setLoadingDl] = useState(false);
  // STATE TO SEE TIMETABLE
  const [openTTPopup, setOpenTTPopUp] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      setOpenAssignPopup(false);
      setOpenUpdatePopup(false);
      setOpenDeletePopup(false);
      setOpenTTPopUp(false);
    }
  };

  setTimeout(() => {
    setErrMsg("");
  }, 5000);

  // GET ALL UNASSIGNED TEACHERS LIST
  useEffect(() => {
    const getUnassignedTeachersList = async () => {
      try {
        const response = await axios.get(
          `${DOMAIN_URL}/api/v1/get-unassigned-teachers`
        );

        setUnassignedTeachers(response?.data?.unassignedTeachers);
      } catch (error) {
        toast.error(
          error.response?.data.message || error.message || "Server Error"
        );
        setError(error.message);
      }
    };

    getUnassignedTeachersList();
  }, []);

  // ASSIGN TEACHER
  const handleAssignTeacher = async () => {
    setLoadingAT(true);
    try {
      setCurrClass("");
      const response = await axios.post(`${DOMAIN_URL}/api/v1/assign-teacher`, {
        classRoomId,
        teacherId,
      });
      setTeacherId("");
      setOpenAssignPopup(false);
      setCurrClass(currClass);
      toast.success("Teacher assigned successfully!");
    } catch (error) {
      toast.error(
        error.response?.data.message || error.message || "Server Error"
      );
      setError(error.message);
    } finally {
      setCurrClass(currClass);
      setLoadingAT(false);
    }
  };

  // UPDATE CLASSROOM
  const handleUpdateClassroom = async () => {
    if (!newDay) {
      setErrMsg("Please select day");
      return;
    }
    if (!newStartTime) {
      setErrMsg("Please select Start time of class");
      return;
    }
    if (!newEndTime) {
      setErrMsg("Please select End time of class");
      return;
    }

    try {
      setLoadingUp(true);
      setCurrClass(0);
      const response = await axios.put(
        `${DOMAIN_URL}/api/v1/update-classroom/${classRoomId}`,
        {
          day: newDay,
          startTime: newStartTime,
          endTime: newEndTime,
          _class: currClass,
        }
      );
      toast.success("Classroom created successfully!");
      setOpenUpdatePopup(false);
      setCurrClass(currClass);
      setNewDay(newDay);
      setNewStartTime(newStartTime);
      setNewEndTime(newEndTime);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      setErrMsg(error.response?.data.message || error.message);
    } finally {
      setLoadingUp(false);
    }
  };

  // DELETE CLASSROOM
  const handleDeleteClassroom = async () => {
    try {
      setLoadingDl(true);
      setCurrClass("");
      const response = await axios.delete(
        `${DOMAIN_URL}/api/v1/delete-classroom/${classRoomId}`
      );
      toast.success("Classroom deleted successfully!");
      setOpenDeletePopup(false);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      setErrMsg(error.response?.data.message || error.message);
    } finally {
      setOpenDeletePopup(false);
      setCurrClass(currClass);
    }
  };

  // DELETE TIMETABLE
  const handleDeleteTimeTable = async (tId) => {
    try {
      setCurrClass("");
      const response = await axios.delete(
        `${DOMAIN_URL}/api/v1/delete-timetable/${classRoomId}/${tId}`
      );
      toast.success("Timetable deleted successfully!");
      setFlag(!flag);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Server Error !"
      );
    } finally {
      setCurrClass(currClass);
    }
  };

  return (
    <div className=" flex border-b-2 items-center">
      <div className=" w-1/6 py-2 items-center flex justify-center font-[500] text-[17px]">
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </div>
      <div className=" w-1/6 py-2 items-center flex justify-center font-[500] text-[17px]">
        {convertTime(startTime)}
      </div>
      <div className=" w-1/6 py-2 items-center flex justify-center font-[500] text-[17px]">
        {convertTime(endTime)}
      </div>
      <div className=" w-1/6 py-2 items-center flex justify-center font-[500] text-[17px]">
        {teacher === null ? (
          <button
            onClick={() => setOpenAssignPopup(true)}
            className="text-[12px] font-semibold bg-[#3cbef6] px-3 py-[8px] rounded-md"
          >
            Assign Teacher
          </button>
        ) : (
          teacher
        )}
      </div>
      <div className=" w-1/6 py-2 flex justify-center font-[500] text-[17px]">
        <button
          onClick={() => setOpenTTPopUp(true)}
          className="bg-[#f7814a] px-3 py-1 rounded-md "
        >
          TimeTable
        </button>
      </div>
      <div className=" w-1/6 py-2 flex justify-center font-[500] text-[17px]">
        <button
          onClick={() => setOpenUpdatePopup(true)}
          className="bg-[#4af74a] px-3 py-1 rounded-md "
        >
          Update
        </button>
      </div>
      <div className=" w-1/6 py-2 flex justify-center font-[500] text-[17px]">
        <button
          onClick={() => setOpenDeletePopup(true)}
          className="bg-[#ed5151] px-3 py-1 rounded-md "
        >
          Delete
        </button>
      </div>

      {openAssignPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpenAssignPopup(false)}
            >
              &times;
            </button>

            <div className="h-full w-full px-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Assign Teacher
              </h2>

              <form className="space-y-4">
                <label
                  htmlFor="class"
                  className="font-bold text-[#504f4f] text-[15px]"
                >
                  Select Teacher to assign class
                  <RedStar />
                </label>
                <select
                  id="class"
                  name="class"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="mt-1 h-[40px] w-full block px-4 border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Teacher</option>
                  {unassignedTeachers?.map((item) => (
                    <option value={item?._id}>{item?.name}</option>
                  ))}
                </select>
                <div className="text-center py-3">
                  <button
                    type="button"
                    disabled={loadingAT || teacherId === ""}
                    onClick={handleAssignTeacher}
                    className="bg-indigo-600  text-white py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loadingAT ? "Updating..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {openUpdatePopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white pb-6 h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpenUpdatePopup(false)}
            >
              &times;
            </button>

            <div className="h-full flex flex-col justify-center w-full items-center px-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Update Classroom
              </h2>

              <div className="flex flex-col w-[90%] ">
                <label
                  htmlFor="class"
                  className=" text-[#5f5e5e] text-[17px] font-semibold"
                >
                  Select new day
                  <RedStar />
                </label>
                <select
                  id="day"
                  name="day"
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                  className="mt-1 h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
              <div className="flex flex-col w-[90%] ">
                <label
                  htmlFor="class"
                  className=" text-[#5f5e5e] text-[17px] font-semibold"
                >
                  Select new start time
                  <RedStar />
                </label>
                <select
                  id="class"
                  name="class"
                  value={newStartTime}
                  onChange={(e) => {
                    setNewStartTime(e.target.value);
                    setNewEndTime("");
                  }}
                  className="mt-1 h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {timesArray.slice(0, 16).map((item) => {
                    return <option value={item[1]}>{item[0]}</option>;
                  })}
                </select>
              </div>
              <div className="flex flex-col w-[90%] ">
                <label
                  htmlFor="class"
                  className=" text-[#5f5e5e] text-[17px] font-semibold"
                >
                  Select new end time
                  <RedStar />
                </label>
                <select
                  id="day"
                  name="day"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="mt-1 h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {timesArray.map(([label, value]) => {
                    const isDisabled =
                      newStartTime && parseInt(value) <= parseInt(newStartTime);

                    return (
                      <option key={value} value={value} disabled={isDisabled}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className=" h-[25px] ">
                {errMsg && (
                  <h1 className="text-[red] font-bold">Error : {errMsg}</h1>
                )}
              </div>
              <button
                disabled={loadingUp}
                onClick={() => handleUpdateClassroom()}
                className={`bg-green-400 text-[#121111] font-semibold py-3 px-5 rounded-lg shadow-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-green-500 ${
                  loadingUp
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-[#a6eaa6]"
                }`}
              >
                {loadingUp ? (
                  <div className="flex items-center justify-center">
                    Loading...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {openDeletePopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white pb-6 h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpenDeletePopup(false)}
            >
              &times;
            </button>

            <div className="h-full flex flex-col justify-center w-full items-center px-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Delete Classroom
              </h2>

              <h1 className="font-bold text-[red] py-2 ">
                Are you sure you want to delete this classroom?{" "}
              </h1>
              <h1 className="flex flex-wrap justify-center items-center text-center font-bold text-[#4a4949]">
                This action cannot be undone, and it will also update the
                teacher's assigned status to "not assigned".
              </h1>

              <div className=" h-[25px] ">
                {errMsg && (
                  <h1 className="text-[red] font-bold">Error : {errMsg}</h1>
                )}
              </div>
              <div className="text-center flex  items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={loadingDl}
                  onClick={handleDeleteClassroom}
                  className=" bg-[#40e540] w-[100px] text-[black] font-bold py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-[#8ee099] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40e540]"
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => setOpenDeletePopup(false)}
                  className="bg-[red] w-[100px] text-white py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-[#f09595] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[red]"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openTTPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white pb-6 h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpenTTPopUp(false)}
            >
              &times;
            </button>

            <div className="h-full flex flex-col justify-center w-full items-center px-4">
              <h2 className="text-2xl font-semibold mb-4 flex gap-2 text-center">
                <img
                  src="https://img.icons8.com/?size=100&id=40459&format=png&color=000000"
                  className="h-[35px]"
                  alt="time-table"
                />{" "}
                Time-Tables
              </h2>

              <div className=" flex  w-full bg-[black] text-white items-center">
                <div className=" w-1/3 py-2 flex justify-center font-[500] text-[17px]">
                  Start Time
                </div>
                <div className=" w-1/3 py-2 flex justify-center font-[500] text-[17px]">
                  End Time
                </div>
                <div className=" w-1/3 py-2 flex justify-center font-[500] text-[17px]">
                  Delete
                </div>
              </div>
              <div className=" w-full h-[50vh] overflow-y-scroll  border-black border-[2px]">
                {timeTable.length === 0 ? (
                  <div className="h-[50px] flex justify-center items-center font-bold text-[gray] text-[20px]">
                    No Timetable today
                  </div>
                ) : (
                  timeTable.map((item) => {
                    return (
                      <div className="w-full flex">
                        <div className=" w-1/3 py-2 flex justify-center font-[500] text-[17px]">
                          {convertTime(item.cStartTime)}
                        </div>
                        <div className=" w-1/3 py-2 flex justify-center font-[500] text-[17px]">
                          {convertTime(item.cEndTime)}
                        </div>
                        <div className=" w-1/3 py-2 flex justify-center font-[500] text-[17px]">
                          <button
                            onClick={() => handleDeleteTimeTable(item?._id)}
                            className="bg-[#f82a2a] rounded-md px-3 hover:bg-[#b83232] py-1 text-[white]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRoomRow;
