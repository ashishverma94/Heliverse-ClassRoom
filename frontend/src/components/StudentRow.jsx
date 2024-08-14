import axios from "axios";
import DOMAIN_URL from "../utils/url";
import { toast } from "react-toastify";
import React, { useState } from "react";

const StudentRow = ({ _class, name, email, id, updateInfo, setUpdateInfo }) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(name || "");
  const [newEmail, setNewEmail] = useState(email || "");
  const [newClass, setNewClass] = useState(1);

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  // UPDATE STUDENT
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${DOMAIN_URL}/api/v1/update-user`, {
        newName,
        newEmail,
        newClass,
        role: "principal",
        id: id,
      });

      toast.success("Information updated successfully!");
      setOpen(false);
      setUpdateInfo(!updateInfo);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Server Error !"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE TEACHER
  const handleDelete = async () => {
    setLoading(true);
    let role = "principal";
    try {
      const response = await axios.delete(
        `${DOMAIN_URL}/api/v1/delete-user/${id}/${role}`
      );

      toast.success("Information updated successfully!");
      setOpen(false);
      setUpdateInfo(!updateInfo);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Server Error !"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex border-b-2 items-center">
      <div className=" w-[30%] py-2 flex justify-center font-[500] text-[17px]">
        {name}
      </div>
      <div className=" w-[40%] py-2 flex justify-center font-[500] text-[17px]">
        {email}
      </div>
      <div className=" w-[10%] py-2 flex justify-center font-[500] text-[17px]">
        {_class}
      </div>
      <div className=" w-[10%] py-2 flex justify-center font-[500] text-[17px]">
        <button
          onClick={() => setOpen(true)}
          className="bg-[#4af74a] px-3 py-1 rounded-md "
        >
          Update
        </button>
      </div>
      <div className=" w-[10%] py-2 flex justify-center font-[500] text-white text-[17px]">
        <button
          onClick={() => setOpenDel(true)}
          className="bg-[#ed5151] px-3 py-1 rounded-md "
        >
          {" "}
          Delete{" "}
        </button>
      </div>

      {/* UPDATE INFORMATION POPUP  */}
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
                Update Information
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
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
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
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Class
                  </label>
                  <select
                    id="class"
                    name="class"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
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
                <div className="text-center">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleUpdate}
                    className="bg-indigo-600 text-white py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading ? "Updating..." : "Update Information"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE INFORMATION POPUP  */}
      {openDel && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white h-[230px] p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpenDel(false)}
            >
              &times;
            </button>

            <div className="h-full w-full px-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Delete Information
              </h2>
              <form className="space-y-4">
                <h1 className="text-center font-bold text-[20px] text-wrap ">
                  Are you sure, <br /> you want to delete this item?
                </h1>

                <div className="text-center flex  items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleDelete}
                    className=" bg-[#40e540] w-[100px] text-[black] font-bold py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-[#8ee099] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenDel(false)}
                    className="bg-[red] w-[100px] text-white py-2 px-4 disabled:bg-[gray] rounded-lg hover:bg-[#f09595] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    NO
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

export default StudentRow;
