import React, { useState } from "react";
import TeacherList from "./TeacherList";
import StudentList from "./StudentList";
import ClassRoom from "./ClassRoomList";
import { logout } from "../utils/function";
import CreateClassRoom from "./CreateClassRoom";

const PrincipalDashboard = () => {
  const [active, setActive] = useState(0);

  return (
    <div className=" w-[100%] flex h-[88vh]">
      <div className="h-[88vh] w-[20%] border-r-4">
        <div className=" w-full flex px-4 flex-col gap-2 py-4 h-[75vh]">
          <div
            onClick={() => setActive(0)}
            className={`${
              active === 0 && "bg-[#8ab1eb]"
            } w-full cursor-pointer    h-[50px] border-[2px] border-[gray] rounded-[4px] hover:rounded-[10px] flex justify-center hover:bg-[#8ab1eb] items-center text-lg font-[500]`}
          >
            Teachers
          </div>
          <div
            onClick={() => setActive(1)}
            className={`${
              active === 1 && "bg-[#8ab1eb]"
            } w-full cursor-pointer   h-[50px] border-[2px] border-[gray] rounded-[4px] hover:rounded-[10px] flex justify-center hover:bg-[#8ab1eb] items-center text-lg font-[500]`}
          >
            Students
          </div>
          <div
            onClick={() => setActive(2)}
            className={`${
              active === 2 && "bg-[#8ab1eb]"
            } w-full cursor-pointer  h-[50px] border-[2px] border-[gray] rounded-[4px] hover:rounded-[10px] flex justify-center hover:bg-[#8ab1eb] items-center text-lg font-[500]`}
          >
            Class Room
          </div>
          <div
            onClick={() => setActive(3)}
            className={`${
              active === 3 && "bg-[#8ab1eb]"
            } w-full cursor-pointer  h-[50px] border-[2px] border-[gray] rounded-[4px] hover:rounded-[10px] flex justify-center hover:bg-[#8ab1eb] items-center text-lg font-[500]`}
          >
            Create ClassRoom
          </div>
        </div>
        <div className=" flex justify-center items-center w-full h-[13vh]">
          <button
            onClick={() => logout()}
            class="flex items-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <img
              src="https://img.icons8.com/?size=100&id=voArpXRj4dc5&format=png&color=F8EFEF"
              alt="Logout Icon"
              class="w-5 h-5 mr-2"
            />
            Logout
          </button>
        </div>
      </div>
      <div className="h-[88vh]  w-[80%]">
        <h1 className=" text-center p-4 font-[800] h-[10vh] text-[30px]">
          Principal Dashboard
        </h1>
        <div className=" w-full flex h-[78vh]">
          {active === 0 && <TeacherList />}
          {active === 1 && <StudentList />}
          {active === 2 && <ClassRoom />}
          {active === 3 && <CreateClassRoom />}
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
