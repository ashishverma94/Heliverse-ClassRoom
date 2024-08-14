import axios from "axios";
import DOMAIN_URL from "../utils/url";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { timesArray } from "../utils/data";
import RedStar from "./RedStar";

const CreateClassRoom = () => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [_class, setClass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    if (errMsg) {
      setErrMsg("");
    }
  }, 3000);

  const handleSubmit = async () => {
    if (!_class) {
      setErrMsg("Please select class");
      return;
    }
    if (!day) {
      setErrMsg("Please select day");
      return;
    }
    if (!startTime) {
      setErrMsg("Please select Start time of class");
      return;
    }
    if (!endTime) {
      setErrMsg("Please select End time of class");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${DOMAIN_URL}/api/v1/create-classroom`,
        {
          day,
          _class,
          startTime,
          endTime,
        }
      );
      toast.success("Classroom created successfully!");
      setDay("");
      setStartTime("");
      setEndTime("");
      setClass("");
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      setErrMsg(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full gap-2  flex flex-col items-center  py-[20px]">
      <div className="w-full h-max flex-col   flex gap-6 px-0 md:w-[55%] items-center">
        <div className="flex flex-col w-[70%] ">
          <label
            htmlFor="class"
            className=" text-[#5f5e5e] text-[17px] font-semibold"
          >
            Select class
            <RedStar />
          </label>
          <select
            id="class"
            name="class"
            value={_class}
            onChange={(e) => setClass(e.target.value)}
            className="mt-1 h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Class</option>
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
        <div className="flex flex-col w-[70%] ">
          <label
            htmlFor="class"
            className=" text-[#5f5e5e] text-[17px] font-semibold"
          >
            Select day
            <RedStar />
          </label>
          <select
            id="day"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="mt-1 h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tudeday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
          </select>
        </div>
        <div className="flex flex-col w-[70%] ">
          <label
            htmlFor="class"
            className=" text-[#5f5e5e] text-[17px] font-semibold"
          >
            Select Start time
            <RedStar />
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
            <option value="">Start Time</option>
            {timesArray.slice(0, 16).map((item) => {
              return <option value={item[1]}>{item[0]}</option>;
            })}
          </select>
        </div>
        <div className="flex flex-col w-[70%] ">
          <label
            htmlFor="class"
            className=" text-[#5f5e5e] text-[17px] font-semibold"
          >
            Select End Time
            <RedStar />
          </label>
          <select
            id="day"
            name="day"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 h-[40px] block w-[full] border-[2px] font-bold border-[gray] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">End Time</option>

            {timesArray.map(([label, value]) => {
              const isDisabled =
                startTime && parseInt(value) <= parseInt(startTime);

              return (
                <option key={value} value={value} disabled={isDisabled}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className=" h-[25px]">
        {errMsg && <h1 className="text-[red] font-bold">Error : {errMsg}</h1>}
      </div>
      <button
        disabled={loading}
        onClick={() => handleSubmit()}
        className={`bg-green-400 text-[#121111] font-semibold py-3 px-5 rounded-lg shadow-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-green-500 ${
          loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#a6eaa6]"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default CreateClassRoom;
