import React, { useState } from "react";
import { convertTime } from "../utils/function";

const ClassTTRow = ({ startTime, endTime, teacher, timeTables, day }) => {
  const [openPopup, setOpenPopup] = useState(false);
  console.log(teacher, endTime);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      setOpenPopup(false);
    }
  };

  return (
    <div className=" flex border-b-2 items-center">
      <div className=" w-1/5 py-2 items-center flex justify-center font-[500] text-[17px]">
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </div>
      <div className=" w-1/5 py-2 items-center flex justify-center font-[500] text-[17px]">
        {convertTime(startTime)}
      </div>
      <div className=" w-1/5 py-2 items-center flex justify-center font-[500] text-[17px]">
        {convertTime(endTime)}
      </div>
      <div className=" w-1/5 py-2 items-center flex justify-center font-[500] text-[17px]">
        {!teacher ? (
          <span className="text-[gray]">Not Assigned </span>
        ) : (
          teacher
        )}
      </div>
      <div className=" w-1/5 py-2 flex justify-center font-[500] text-[17px]">
        <button
          disabled={!teacher}
          onClick={() => setOpenPopup(true)}
          className="bg-[#f77e4a] disabled:bg-[gray] px-2 py-1 text-[12px] font-bold rounded-md "
        >
          View TimeTable
        </button>
      </div>

      {openPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white pb-6 h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpenPopup(false)}
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
                <div className=" w-[50%] py-2 flex justify-center font-[500] text-[17px]">
                  Start Time
                </div>
                <div className=" w-[50%] py-2 flex justify-center font-[500] text-[17px]">
                  End Time
                </div>
              </div>
              <div className=" w-full h-[50vh] overflow-y-scroll  border-black border-[2px]">
                {timeTables.length === 0 ? (
                  <div className="h-[50px] flex justify-center items-center font-bold text-[gray] text-[20px]">
                    No Timetable today
                  </div>
                ) : (
                  timeTables.map((item) => {
                    return (
                      <div className="w-full flex">
                        <div className=" w-[50%] py-2 flex justify-center font-[500] text-[17px]">
                          {convertTime(item.cStartTime)}
                        </div>
                        <div className=" w-[50%] py-2 flex justify-center font-[500] text-[17px]">
                          {convertTime(item.cEndTime)}
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

export default ClassTTRow;
