import axios from "axios";
import TeacherRow from "./TeacherRow";
import DOMAIN_URL from "../utils/url";
import { toast } from "react-toastify";
import LoaderGif from "../assets/Loading.gif";
import React, { useEffect, useState } from "react";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${DOMAIN_URL}/api/v1/get-all-users`,
          {
            role: "principal",
            type: "teacher",
          }
        );

        setTeachers(response?.data);
      } catch (error) {
        toast.error(error.message || "Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [updateInfo]);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  const handleAddUser = async () => {
    setLoadingUser(true);
    try {
      const response = await axios.post(`${DOMAIN_URL}/api/v1/create-user`, {
        name,
        email,
        password,
        role: "teacher",
        mainRole: "principal",
      });

      console.log(response);

      setName("");
      setEmail("");
      setPassword("");

      toast.success("User added successfully!");
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || err.message || "Server Error !"
      );
    } finally {
      setUpdateInfo(!updateInfo);
      setLoadingUser(false);
    }
  };

  return (
    <div className=" w-full h-[70vh] flex flex-col items-center justify-center py-[20px]">
      <h1 className=" w-full md:w-[75%] text-center md:text-end">
        <button
          onClick={(e) => setOpen(true)}
          className="bg-[#2a8eeb] text-white px-4 py-3 font-bold rounded-lg mb-2"
        >
          Add Teacher
        </button>
      </h1>
      <div className="h-full  w-full md:w-[75%]   border-[2px] border-[#656262]">
        <div className=" flex border-b-2">
          <div className=" bg-[black] text-white w-[30%] py-2 flex justify-center font-[500] text-[17px]">
            Name
          </div>
          <div className=" bg-[black] text-white w-[50%] py-2 flex justify-center font-[500] text-[17px]">
            Email
          </div>
          <div className=" bg-[black] text-white w-[10%] py-2 flex justify-center font-[500] text-[17px]">
            Update
          </div>
          <div className=" bg-[black] text-white w-[10%] py-2 flex justify-center font-[500] text-[17px]">
            Delete
          </div>
        </div>
        <div className=" overflow-y-scroll h-[50vh]">
          {loading ? (
            <div className=" w-full h-[50vh] flex justify-center items-center">
              <img src={LoaderGif} alt="loading" />
            </div>
          ) : (
            <>
              {teachers.success === false ? (
                <div className="flex justify-center items-center w-full mt-5 text-[red] text-[18px] text-wrap">
                  {teachers?.message}
                </div>
              ) : (
                <>
                  {teachers?.data
                    ?.slice()
                    .reverse()
                    .map((item) => {
                      return (
                        <TeacherRow
                          name={item?.name}
                          email={item?.email}
                          id={item?._id}
                          key={item?._id}
                          updateInfo={updateInfo}
                          setUpdateInfo={setUpdateInfo}
                        />
                      );
                    })}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>

            <div className="h-full w-full px-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Add User
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    disabled={loadingUser}
                    onClick={handleAddUser}
                    className="bg-indigo-600 text-white py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loadingUser ? "Adding..." : "Add User"}
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

export default TeacherList;
