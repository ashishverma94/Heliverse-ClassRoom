import axios from "axios";
import DOMAIN_URL from "../utils/url";
import { toast } from "react-toastify";
import LoaderGif from "../assets/Loading.gif";
import React, { useEffect, useState } from "react";
import ClassRow from "./ClassRow";

const ClassList = ({ c }) => {
  const [studs, setStuds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClassStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${DOMAIN_URL}/api/v1/get-students/${c}`,
          {
            role: "principal",
            type: "teacher",
          }
        );

        setStuds(response?.data);
      } catch (error) {
        toast.error(error?.message || "Internal server error");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassStudents();
  }, [c]);

  return (
    <div className=" w-full h-[70vh] flex flex-col items-center justify-center py-[20px]">
      <div className="flex justify-start  w-full md:w-[75%] font-bold text-[25px] ">
        Class : {c}
      </div>
      <div className="h-full  w-full md:w-[75%]   border-[2px] border-[#656262]">
        <div className=" flex border-b-2">
          <div className=" bg-[black] text-white w-[50%] py-2 flex justify-center font-[500] text-[17px]">
            Name
          </div>
          <div className=" bg-[black] text-white w-[50%] py-2 flex justify-center font-[500] text-[17px]">
            Email
          </div>
        </div>
        <div className=" overflow-y-scroll h-[50vh]">
          {loading ? (
            <div className=" w-full h-[50vh] flex justify-center items-center">
              <img src={LoaderGif} alt="loading" />
            </div>
          ) : (
            <>
              {studs.success === false ? (
                <div className="flex justify-center items-center w-full mt-5 text-[red] text-[18px] text-wrap">
                  {studs?.message}
                </div>
              ) : (
                <>
                  {studs?.data
                    ?.slice()
                    .reverse()
                    .map((item) => {
                      return (
                        <ClassRow
                          name={item?.name}
                          email={item?.email}
                          id={item?._id}
                          key={item?._id}
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

export default ClassList;
