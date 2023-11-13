import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOtp = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [userData, setUserData] = useState(null);

  // useEffect(() => {

  //     const user = JSON.parse(localStorage.getItem("user11"));
  //     if (user) {
  //         setUserData(user);
  //     }

  // }, []);

  const [formData, setFormData] = useState({
    otp: "",
  });

  const navigate = useNavigate();

  const [otpInput, setOtpInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(3000); // Initial time set to 30 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrement the time by 1 second
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000); // Runs every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      // Redirect to the login page after 30 seconds
      navigate("/");
    }
  }, [timeRemaining, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleOtpSubmission = async () => {

  //     const user = JSON.parse(localStorage.getItem("user11"));

  //       if (user) {
  //         const data = {
  //             ...formData,
  //             userId: user.id, // Assuming user.id is the identifier for the user
  //         };
  //     try{
  //     const response = await axios.post(
  //         "https://hsyn.pythonanywhere.com/adminapi/adminauth/checkOtpToken/",
  //         data
  //     );
  //     if (response.data.status === true) {
  //         localStorage.setItem("user12", JSON.stringify(response.data.payload));
  //         // alert(response.data.msg);
  //         alert(response.data.message);

  //         navigate("/ResetPasswordAdmin");
  //     }
  //     else if (response.data.status === false) {
  //         setErrorMessage(response.data.error);
  //     }

  //     console.log("JWT Token:", response);
  // } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     // Handle error as needed
  // }
  // }
  //     // setErrorMessage(error?.response?.data?.message?.non_field_errors?.[0]);

  // };
  const handleOtpSubmission = async () => {
    try {
      // Attempt to retrieve the user data from local storage
      const userString = localStorage.getItem("user11");

      if (userString) {
        // If user data exists, parse it

        const data = new FormData();
        data.append("otp", formData.otp);
        data.append("id", userString);

        const response = await axios.post(
          "https://hsyn.pythonanywhere.com/adminapi/adminauth/checkOtpToken/",
          data
        );

        if (response.data.status === true) {
        //   localStorage.setItem("user12", JSON.stringify(response.data.payload));
          alert(response.data.message);
          navigate("/ResetPasswordAdmin");
        } else if (response.data.status === false) {
          setErrorMessage(response.data.error);
        }

        console.log("JWT Token:", response);
      } else {
        // Handle the case where user data is not found in local storage
        console.error("User data not found in local storage");
      }
    } catch (error) {
      // Handle errors during the process
      console.error("Error during OTP submission:", error);
    }
  };

  return (
    <>
      {/* {userData && (
                <div>
                    <p>Username: {userData.id}</p>
                    <p>Username: {userData.otp}</p>
                    <p>Username: {userData.email}</p>
                    <p>Username: {userData.phone}</p>
                </div>
            )} */}
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        OTP
                      </p>
                      <p>Time remaining: {timeRemaining} seconds</p>
                      {/* {errorMessage && (
                                                <p className="text-danger text-center">
                                                    {errorMessage}
                                                </p>
                                            )} */}
                      <div className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Enter OTP
                            </label>
                            <input
                              type="number"
                              id="form3Example3c"
                              className="form-control"
                              name="otp"
                              value={formData.otp}
                              onChange={handleInputChange}
                            />
                            {/* {errorMessage1 && (
                                                            <p className="text-danger">{errorMessage1}</p>
                                                        )} */}
                          </div>
                        </div>

                        {/* <Link to="/Signup">Please Register Here</Link> */}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            onClick={() => handleOtpSubmission()}
                          >
                            OTP
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminOtp;
