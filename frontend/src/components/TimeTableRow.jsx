import axios from "axios";
import DOMAIN_URL from "../utils/url";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { convertTime } from "../utils/function";

const TimeTableRow = ({
  startTime,
  endTime,
  index,
  tId,
  cId,
  timeTables,
  updateInfo,
  setUpdateInfo,
}) => {
  // STATE TO UPDATE TIMETABLE
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [newEndTime, setNewEndTime] = useState(endTime);
  const [errMsg, setErrMsg] = useState("");
  const [loadingUp, setLoadingUp] = useState(false);
  // STATE TO DELETE TIMETABLE
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [loadingDl, setLoadingDl] = useState(false);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      setOpenUpdatePopup(false);
      setOpenDeletePopup(false);
      setNewEndTime('');
      setNewStartTime('') ;
    }
  };

  setTimeout(() => {
    setErrMsg("");
  }, 5000);

  // DELETE TIMETABLE
  const handleDeleteTimetable = async () => {
    setLoadingDl(true);
    try {
      const response = await axios.delete(
        `${DOMAIN_URL}/api/v1/delete-timetable/${cId}/${tId}`
      );

      toast.success("Timetable deleted successfully!");
      setOpenDeletePopup(false);
      setUpdateInfo(!updateInfo);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Server Error !"
      );
    } finally {
      setLoadingDl(false);
    }
  };

  return (
    <div className=" flex border-b-2 items-center">
      <div className=" w-1/4 py-2 items-center flex justify-center font-[500] text-[17px]">
        {index + 1}
      </div>
      <div className=" w-1/4 py-2 items-center flex justify-center font-[500] text-[17px]">
        {convertTime(startTime)}
      </div>
      <div className=" w-1/4 py-2 items-center flex justify-center font-[500] text-[17px]">
        {convertTime(endTime)}
      </div>
      <div className=" w-1/4 py-2 flex justify-center font-[500] text-[17px]">
        <button
          onClick={() => setOpenDeletePopup(true)}
          className="bg-[#e94c4c] px-3 py-1 rounded-md "
        >
          Delete
        </button>
      </div>

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
                Delete TimeTable
              </h2>

              <h1 className="font-bold text-[#444141] py-2 text-wrap text-center">
                Are you sure you want to delete this timetable?
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
                  onClick={handleDeleteTimetable}
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
    </div>
  );
};

export default TimeTableRow;
