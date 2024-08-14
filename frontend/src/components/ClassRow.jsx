
import React from "react";

const ClassRow = ({ name, email }) => {
  return (
    <div className=" flex border-b-2 items-center">
      <div className=" w-[50%] py-2 flex justify-center font-[500] text-[17px]">
        {name}
      </div>
      <div className=" w-[50%] py-2 flex justify-center font-[500] text-[17px]">
        {email}
      </div>
    </div>
  );
};

export default ClassRow;
