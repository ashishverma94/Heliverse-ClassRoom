import axios from "axios";
import RedStar from "./RedStar";
import DOMAIN_URL from "../utils/url";
import { toast } from "react-toastify";
import TimeTableRow from "./TimeTableRow";
import { timesArray } from "../utils/data";
import LoaderGif from "../assets/Loading2.gif";
import React, { useEffect, useState } from "react";
import { convertTime, getEndTimes, isTimeInRange } from "../utils/function";

const TeacherClassRoomList = () => {
  // LOADING CLASSROOM STATE
  const [loadingCR, setLoadingCR] = useState(false);
  const teacherId = localStorage.getItem("userId");
  const [classRoom, setClassRoom] = useState([]);

  // ADD TIMETABLE STATE
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loadingAT, setLoadingAT] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [timeTables, setTimeTables] = useState([]);
  const [filteredStartTimes, setFilteredStartTimes] = useState(timesArray);
  const [filteredEndTimes, setFilteredEndTimes] = useState([]);
  const [updateInfo, setUpdateInfo] = useState(false);

  useEffect(() => {
    const getClassRoomByTeacherId = async () => {
      setLoadingCR(true);
      try {
        const response = await axios.get(
          `${DOMAIN_URL}/api/v1/get-classroom-teacher/${teacherId}`
        );
        setClassRoom(response?.data);
        setClassroomId(response?.data[0]._id);
        setTimeTables(response?.data[0].timeTables);
      } catch (error) {
        toast.error("Error in loading Classroom data");
      } finally {
        setLoadingCR(false);
      }
    };
    getClassRoomByTeacherId();
  }, [teacherId, updateInfo]);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      setOpenAddPopup(false);
      setStartTime("");
      setEndTime("");
    }
  };

  useEffect(() => {
    const filterSArray = timesArray.map(([timeString, timeNumber]) => [
      timeString,
      timeNumber,
      isTimeInRange(timeNumber, timeTables),
    ]);
    setFilteredStartTimes(filterSArray);
    console.log(filteredStartTimes);
    if (startTime) {
      const filterEArray = getEndTimes(filterSArray, startTime);
      setFilteredEndTimes(filterEArray);
    }
  }, [startTime, timeTables]);

  setTimeout(() => {
    setErrMsg("");
  }, 4000);

  const handleAddTimetable = async () => {
    if (!startTime) {
      setErrMsg("Error : Select start time ");
      return;
    }
    if (!endTime) {
      setErrMsg("Error : Select end Tiime");
      return;
    }
    try {
      setLoadingAT(true);
      const response = await axios.post(
        `${DOMAIN_URL}/api/v1/create-timetable`,
        {
          startTime,
          endTime,
          role: "teacher",
          classroomId,
        }
      );
      toast.success("TimeTable created successfully!");
      setTimeTables(response?.data?.classRoom?.timeTables);
      setStartTime("");
      setEndTime("");
      setOpenAddPopup(false);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      setErrMsg(error.response?.data.message || error.message);
    } finally {
      setLoadingAT(false);
    }
  };

  return (
    <div className=" w-full  flex flex-col items-center ">
      <div className=" w-full md:w-[65%]">
        <div className="w-full py-2">
          <h1 className="font-bold text-[20px]">Classroom Info:</h1>
          <div className="w-full px-4  rounded-lg bg-[#e6e9f3] h-full sm:h-20 py-4 my-3 flex  items-center justify-center shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)]">
            <div className="w-full p-3 justify-between flex">
              {loadingCR ? (
                <div className=" w-full h-full flex justify-center items-center">
                  <img className="h-[60px]" src={LoaderGif} alt="loading" />
                </div>
              ) : classRoom.length === 0 ? (
                <h1 className="text-center flex gap-2 justify-center items-center w-full text-[20px] font-bold text-[#4b4949]">
                  <img
                    className="w-[30px]"
                    src="https://img.icons8.com/?size=100&id=Uv511oWJlX0n&format=png&color=000000"
                    alt="cross-image"
                  />
                  No classroom found
                </h1>
              ) : (
                <div className=" w-full md:flex-row flex-col gap-4 justify-between flex">
                  <div className="neumorphism px-6 py-3 border-[2px] rounded-lg">
                    <span className="font-bold">Day</span> :{" "}
                    {classRoom[0].day.charAt(0).toUpperCase() +
                      classRoom[0].day.slice(1)}
                  </div>
                  <div className=" px-6 py-3 border-[2px] neumorphism rounded-lg">
                    <span className="font-bold">Start Time</span> :{" "}
                    {convertTime(classRoom[0].startTime || "11")}
                  </div>
                  <div className=" px-6 py-3 border-[2px] neumorphism rounded-lg">
                    <span className="font-bold">End Time</span> :{" "}
                    {convertTime(classRoom[0].endTime || "12")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" md:w-[65%] w-full h-[full]">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setOpenAddPopup(true)}
            disabled={classRoom.length === 0}
            className=" bg-[#f59a24] disabled:bg-[gray] text-center text-white px-5 rounded-md my-2 py-2 flex font-[500] text-[15px]"
          >
            Add Timetable
          </button>
        </div>

        <div className=" flex">
          <div className=" bg-[black] text-center text-white w-1/4 py-2 flex justify-center font-[500] text-[17px]">
            Index
          </div>
          <div className=" bg-[black] text-center text-white w-1/4 py-2 flex justify-center font-[500] text-[17px]">
            Start Time
          </div>
          <div className=" bg-[black] text-center text-white w-1/4 py-2 flex justify-center font-[500] text-[17px]">
            End Time
          </div>
          <div className=" bg-[black] text-center text-white w-1/4 py-2 flex justify-center font-[500] text-[17px]">
            Delete Timetable
          </div>
        </div>
        <div className=" overflow-y-scroll border-[1px] border-black border-t-0 h-[35vh]">
          {timeTables.length === 0 ? (
            <div className="w-full h-full flex justify-center text-[24px] items-center font-bold text-[gray]">
              <img
                className="w-[30px]"
                src="https://img.icons8.com/?size=100&id=Uv511oWJlX0n&format=png&color=000000"
                alt="cross-image"
              />
              No Timetables found
            </div>
          ) : (
            timeTables
              .slice()
              .reverse()
              .map((item, key) => {
                return (
                  <TimeTableRow
                    startTime={item.cStartTime}
                    endTime={item.cEndTime}
                    tId={item._id}
                    key={key}
                    index={key}
                    cId={classroomId}
                    timeTables={timeTables}
                    updateInfo={updateInfo}
                    setUpdateInfo={setUpdateInfo}
                  />
                );
              })
          )}
        </div>
      </div>

      {openAddPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpenAddPopup(false)}
            >
              &times;
            </button>
            <div className="h-full w-full px-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Add Timetable
              </h2>
              <form className="space-y-4 pb-3">
                <div className="flex flex-col w-[full] ">
                  <label
                    htmlFor="class"
                    className=" text-[#5f5e5e] text-[17px] font-semibold"
                  >
                    Select Start time <RedStar />
                  </label>
                  <select
                    id="class"
                    name="class"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      setEndTime("");
                    }}
                    className="mt-1 h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value={""}>Start Time</option>
                    {filteredStartTimes.slice(0, 16).map((item) => {
                      return (
                        <option
                          className=" disabled:cursor-not-allowed"
                          disabled={item[2]}
                          value={item[1]}
                        >
                          {item[0]}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-[full] ">
                  <label
                    htmlFor="class"
                    className=" text-[#5f5e5e] text-[17px] font-semibold"
                  >
                    Select End time <RedStar />
                  </label>
                  <select
                    disabled={!startTime}
                    id="class"
                    name="class"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                    className="mt-1 disabled:cursor-not-allowed h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>End Time</option>
                    {filteredEndTimes.slice(0, 16).map((item) => {
                      return <option value={item[1]}>{item[0]}</option>;
                    })}
                  </select>
                </div>
                <div className="w-full text-center text-[red] text-[14px] font-bold h-[3vh]">
                  {errMsg}
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    disabled={loadingAT}
                    onClick={handleAddTimetable}
                    className="bg-indigo-600 text-white py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loadingAT ? "Loading..." : "Add Timetable"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherClassRoomList;
