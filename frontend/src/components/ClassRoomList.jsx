import React, { useEffect, useState } from "react";
import ClassRoomRow from "./ClassRoomRow";
import { toast } from "react-toastify";
import axios from "axios";
import DOMAIN_URL from "../utils/url";
import LoaderGif from "../assets/Loading.gif";

const TeacherList = () => {
  const [currClass, setCurrClass] = useState(0);
  const [classrooms, setClassrooms] = useState([]);
  const [loadingClassrooms, setLoadingClassrooms] = useState(false);
  const [classroomErrMsg, setClassroomErrMsg] = useState("");  

  useEffect(() => {
    const fetchClassRooms = async () => {
      if (currClass === 0) return;
      setLoadingClassrooms(true);
      try {
        const response = await axios.get(
          `${DOMAIN_URL}/api/v1/get-classrooms/${currClass}`
        );
        setClassrooms(response?.data?.classes);
      } catch (error) {
        setClassroomErrMsg(error.message);
      } finally {
        setLoadingClassrooms(false);
      }
    };

    fetchClassRooms();
  }, [currClass]);

  return (
    <div className=" w-full  flex flex-col items-center  py-[20px]">
      <div className="w-full flex justify-between px-0 md:w-[65%] items-center h-[8vh]">
        <div className="flex w-full items-center gap-2">
          <label htmlFor="class" className="font-bold text-[gray] text-[20px]">
            Select class
          </label>
          <select
            id="class"
            name="class"
            value={currClass}
            onChange={(e) => setCurrClass(e.target.value)}
            className="mt-1 h-[30px] block w-[70px] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>
      <div className="  w-full md:w-[75%]   border-[2px] border-[#656262]">
        <div className=" flex border-b-2">
          <div className=" bg-[black] text-center text-white w-1/6 py-2 flex justify-center font-[500] text-[17px]">
            Day
          </div>
          <div className=" bg-[black] text-center text-white w-1/6 py-2 flex justify-center font-[500] text-[17px]">
            Start Time
          </div>
          <div className=" bg-[black] text-center text-white w-1/6 py-2 flex justify-center font-[500] text-[17px]">
            End Time
          </div>
          <div className=" bg-[black] text-center text-white w-1/6 py-2 flex justify-center font-[500] text-[17px]">
            Teacher
          </div>
          <div className=" bg-[black] text-center text-white w-1/6 py-2 flex justify-center font-[500] text-[17px]">
            View TimeTable
          </div>
          <div className=" bg-[black] text-center text-white w-1/6 py-2 flex justify-center font-[500] text-[17px]">
            Update Classroom
          </div>
          <div className=" bg-[black] text-center text-white w-1/6 py-2 flex justify-center font-[500] text-[17px]">
            Delete Classroom
          </div>
        </div>
        <div className=" overflow-y-scroll h-[50vh]">
          {loadingClassrooms ? (
            <div className=" w-full h-[50vh] flex justify-center items-center">
              <img src={LoaderGif} alt="loading" />
            </div>
          ) : (
            <>
              {classrooms.length === 0 ? (
                <div className="flex flex-col gap-3 justify-center h-[40vh] items-center w-full font-[800] mt-5 text-[#565454] text-[28px] text-wrap">
                  <img
                    src="https://img.icons8.com/?size=100&id=lj7F2FvSJWce&format=png&color=000000"
                    alt="empty"
                  />
                  <div>No Classrooms</div>
                </div>
              ) : (
                <>
                  {classrooms
                    ?.slice()
                    .reverse()
                    .map((item) => {
                      return (
                        <ClassRoomRow
                          day={item?.day}
                          startTime={item?.startTime}
                          endTime={item?.endTime}
                          teacher={item?.teacher || null}
                          classRoomId={item?._id}
                          currClass={currClass}
                          setCurrClass={setCurrClass}
                          timeTable = {item?.timeTables}
                        />
                      );
                    })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
