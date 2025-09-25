import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../config/axios.js";
import toast from "react-hot-toast";
import { div } from "framer-motion/client";

const AForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleSend(e) {
    setLoading(true);
    setErrorMessage(null);
    e.preventDefault();

    try {
      const res = await api.post("/auth/aforgotPassword", { email });
      if (res.data.success) {
        setLoading(false);
        toast(res?.data?.message);
        setSuccessMessage(res?.data?.message);
      }
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message) || "Something went wrong";
      console.log(error);
    }
  }

  if (loading) {
    <div>Loading...</div>;
  }

  if (successMessage) {
    return (
      <div className="text-blue-500 font-bold text-3xl flex h-[100vh] items-center justify-center">{successMessage}</div>
    );
  }
  return (
    <section className="bg-[#E7EAFC] p-6  flex justify-center items-center h-screen">
      <div className="bg-white flex flex-col  w-[30rem] py-10 shadow-2xl rounded-lg ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4 mb-5 sm:mb-2">
            <h2 className="flex justify-center font-bold text-4xl">
              Welcome!{" "}
            </h2>
            <p className="flex justify-center font-bold">
              Please provide a valid email to send a reset link
            </p>
            <div className="text-red-500">{errorMessage? errorMessage: null}</div>
          </div>
          <div className="flex flex-col gap-3 mb-5"></div>
          <div className="flex flex-col gap-5 w-full px-10">
            <form
              onSubmit={handleSend}
              className="flex flex-col gap-y-5 w-full "
            >
              
              <div>
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
                />
              </div>

              <button
                type="submit"
                className="bg-[#1b1ba3] text-white font-bold rounded-lg h-10 w-full cursor-pointer"
              >
                Send Mail
              </button>
              <button
                onClick={() => navigate(-1)} type="button"
                className="bg-[#1b1ba3] text-white font-bold rounded-lg h-10 w-full cursor-pointer"
              >
                Back to login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AForgotPassword;
