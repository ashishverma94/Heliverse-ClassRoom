import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="  flex-col w-full h-[100vh] text-white flex justify-center items-center font-[1000] text-[45px]">
      <div className="empty_text">404</div>
      <div className="empty_text">Page Not Found</div>
      <button
        onClick={() => navigate("/dashboard")}
        className="text-[white] text-[20px] font-[400] rounded-[4px] my-2 bg-[blue] px-3 py-2"
      >
        Go to dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;
