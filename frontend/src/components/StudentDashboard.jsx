import ClassList from "./ClassList";
import React, { useEffect, useState } from "react";
import { logout } from "../utils/function";
import ClassRoomTimeTableList from "./ClassRoomTimeTableList";
import { toast } from "react-toastify";
import axios from "axios";
import DOMAIN_URL from "../utils/url";

const StudentDashboard = () => {
  const [active, setActive] = useState(0);
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${DOMAIN_URL}/api/v1/get-user/${id}`);
        setUser(response?.data?.data);
      } catch (error) {
        console.log(error);
        toast.error("User not found");
      }
    };
    getUser();
  }, [id]);

  return (
    <div className=" w-[100%] flex h-[88vh]">
      <div className="h-[88vh] w-[20%] border-r-4">
        <div className=" w-full flex px-4 flex-col gap-2 py-4 h-[75vh]">
          <div
            onClick={() => setActive(0)}
            className={`${
              active === 0 && "bg-[#8ab1eb]"
            } w-full cursor-pointer   h-[50px] border-[2px] border-[gray] rounded-[4px] hover:rounded-[10px] flex justify-center hover:bg-[#8ab1eb] items-center text-lg font-[500]`}
          >
            Students
          </div>
          <div
            onClick={() => setActive(1)}
            className={`${
              active === 1 && "bg-[#8ab1eb]"
            } w-full cursor-pointer  h-[50px] border-[2px] border-[gray] rounded-[4px] hover:rounded-[10px] flex justify-center hover:bg-[#8ab1eb] items-center text-lg font-[500]`}
          >
            Classess
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
          Student Dashboard
        </h1>
        <div className=" w-full flex h-[78vh]">
          {active === 0 && <ClassList c={user?._class} />}
          {active === 1 && <ClassRoomTimeTableList c={user?._class} />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
