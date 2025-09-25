import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../config/axios";
import toast from "react-hot-toast";

const EResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


    async function handleReset(e) {
    setLoading(true);
    e.preventDefault();

    if(password !== confirmPassword) {
        setErrorMessage('Password and confirm password should match');
        return toast.error(errorMessage);
    };

    try {
        const res = await api.post(`/auth/employer/resetpassword/${token}`, {password, confirmPassword});
        setSuccessMessage(res?.data?.message)

        if(res.data.success) {
            setLoading(false);
            setSuccessMessage(res.data.message)
            navigate('/elogin')
            toast.success(res.data.message);
        }

        console.log(res.data);
    } catch (error) {
        setLoading(false);
        setErrorMessage(error.response?.data?.message) || 'Something went wrong';
        toast.error(errorMessage);

        console.log(error);
    }
  };

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
                  Please provide a valid new password
                </p>
                <div className="text-red-500">{errorMessage? errorMessage: null}</div>
              </div>
              <div className="flex flex-col gap-3 mb-5"></div>
              <div className="flex flex-col gap-5 w-full px-10">
                <form
                  onSubmit={handleReset}
                  className="flex flex-col gap-y-5 w-full "
                >
                  <div className="text-red-700">
                    {errorMessage ? errorMessage : null}
                  </div>
                  <div>
                    <label htmlFor="">Password</label>
                    <input
                     value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Confirm Password</label>
                    <input
                     value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
                    />
                  </div>
    
                  <button
                    type="submit"
                    disabled = {loading}
                    className="bg-[#1b1ba3] text-white font-bold rounded-lg h-10 w-full cursor-pointer"
                  >
                    Reset
                  </button>
                  
                </form>
              </div>
            </div>
          </div>
        </section>
  )
};

export default EResetPassword;
