import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../redux/reducers/user";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentDashboard from "../components/StudentDashboard";
import PrincipalDashboard from "../components/PrincipalDashboard";

const DashboardPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || !role) {
      navigate("/login");
    }
  }, [token, role]);

  const goToDashboard = () => {
    if (role === "principal") {
      return <PrincipalDashboard />;
    } else if (role === "teacher") {
      return <TeacherDashboard />;
    } else if (role === "student") {
      return <StudentDashboard />;
    } else {
      <h1>Please login to continue</h1>;
    }
  };

  return (
    <div className=" h-[100vh] w-[100%]">
      <div className=" border-b-4 p-2 h-[12vh] justify-between flex items-center text-[40px] text-transparent mx-4 empty_text  font-[800]">
        <p className="bg-gradient-to-r from-[#be3e3e] via-[purple] to-[blue] bg-clip-text leading-normal">
          Heliverse Public School
        </p>
        <img
          src="https://img.icons8.com/?size=100&id=84898&format=png&color=000000"
          alt="profile"
          className=" w-[50px] mx-3"
        />
      </div>
      {goToDashboard()}
    </div>
  );
};

export default DashboardPage;
