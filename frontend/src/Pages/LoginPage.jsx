import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/reducers/user";
import DOMAIN_URL from "../utils/url";
import axios from "axios";


const LoginPage = () => {
  const navigate = useNavigate() ;
  const token  = localStorage.getItem("token") ;
  if ( token ) {
    navigate("/dashboard") ;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    if ( !email){
      setError("Please enter your email")
      return ;
    }
    if ( !password){
      setError("Please enter your password")
      return ;
    }

    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${DOMAIN_URL}/api/v1/login-user`, {
        email,
        password,
      });

      dispatch(
        login({
          email: email,
          password: password,
        })
      );

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("role", response?.data?.role);
      localStorage.setItem("userId", response?.data?.id);

      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(
          `Error: ${err.response.data.message || "Something went wrong"}`
        );
      } else if (err.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-bold  text-center text-[black]">Login</h2>
        <div className="space-y-4">
          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email<span className="mx-1 text-[red] text-[20px] font-bold">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" h-[40px] px-2 mt-1 block w-full border border-[black] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your password<span className="mx-1 text-[red] text-[20px] font-bold">*</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[40px] px-2 mt-1 mb-2 block w-full border border-[black] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            onClick={(e) => handleLogin(e)}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        {error && <div className="text-center text-[red] font-bold">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
