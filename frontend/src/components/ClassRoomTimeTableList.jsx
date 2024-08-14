import React, { useEffect, useState } from "react";
import ClassTTRow from "./ClassTTRow";
import axios from "axios";
import DOMAIN_URL from "../utils/url.js";
import LoaderGif from "../assets/Loading2.gif";

const ClassRoomTimeTableList = ({ c }) => {
  const [loadingTT, setLoadingTT] = useState(false);
  const [classRooms, setClassRooms] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchClassRooms = async () => {
      setLoadingTT(true);
      try {
        const response = await axios.get(
          `${DOMAIN_URL}/api/v1/get-classroom-class/${c}`
        );
        setClassRooms(response?.data?.data);
      } catch (error) {
        setErrMsg(error.message);
      } finally {
        setLoadingTT(false);
      }
    };

    fetchClassRooms();
  }, []);

  return (
    <div className=" w-full  flex flex-col items-center  py-[20px]">
      <div className="  w-full md:w-[65%]   border-[2px] border-[#656262]">
        <div className=" flex border-b-2">
          <div className=" bg-[black] text-center text-white w-1/5 py-2 flex justify-center font-[500] text-[17px]">
            Day
          </div>
          <div className=" bg-[black] text-center text-white w-1/5 py-2 flex justify-center font-[500] text-[17px]">
            Start Time
          </div>
          <div className=" bg-[black] text-center text-white w-1/5 py-2 flex justify-center font-[500] text-[17px]">
            End Time
          </div>
          <div className=" bg-[black] text-center text-white w-1/5 py-2 flex justify-center font-[500] text-[17px]">
            Teacher
          </div>

          <div className=" bg-[black] text-center text-white w-1/5 py-2 flex justify-center font-[500] text-[17px]">
            View TimeTables
          </div>
        </div>
        <div className=" overflow-y-scroll h-[50vh]">
          {loadingTT ? (
            <div className=" w-full h-[50vh] flex justify-center items-center">
              <img src={LoaderGif} alt="loading" />
            </div>
          ) : (
            <>
              {classRooms.length === 0 ? (
                <div className="flex flex-col gap-3 justify-center h-[40vh] items-center w-full font-[800] mt-5 text-[#565454] text-[28px] text-wrap">
                  <img
                    src="https://img.icons8.com/?size=100&id=lj7F2FvSJWce&format=png&color=000000"
                    alt="empty"
                  />
                  <div>No Classrooms</div>
                </div>
              ) : (
                <>
                  {classRooms
                    ?.slice()
                    .reverse()
                    .map((item) => {
                      return (
                        <ClassTTRow
                          day={item?.day}
                          startTime={item?.startTime}
                          endTime={item?.endTime}
                          timeTables={item?.timeTables}
                          teacher={item?.teacher}
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

export default ClassRoomTimeTableList;
