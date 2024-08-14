import React from "react";

const TeacherClassRoomRow = ({ day, startTime, endTime }) => {
  return (
    <div className=" flex border-b-2 items-center">
      <div className=" w-1/5 py-2 flex justify-center font-[500] text-[17px]">
        {day}
      </div>
      <div className=" w-1/5 py-2 flex justify-center font-[500] text-[17px]">
        {startTime}
      </div>
      <div className=" w-1/5 py-2 flex justify-center font-[500] text-[17px]">
        {endTime}
      </div>

      <div className=" w-1/5 py-2 flex justify-center font-[500] text-[black] text-[17px]">
        <button className="bg-[#31bce6] px-3 py-1 rounded-md ">
          Add Timetable
        </button>
      </div>
      <div className=" w-1/5 py-2 flex justify-center font-[500] text-[black] text-[17px]">
        <button className="bg-[#43e631] px-3 py-1 rounded-md ">
          See Timetables
        </button>
      </div>
    </div>
  );
};

export default TeacherClassRoomRow;
