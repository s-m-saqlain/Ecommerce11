import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessage1, setErrorMessage1] = useState(null);
  const [errorMessage2, setErrorMessage2] = useState(null);
  const [errorMessage3, setErrorMessage3] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://hsyn.pythonanywhere.com/adminapi/adminauth/adminLogin/",
        formData
      );
      if (response.data.status === true) {
        localStorage.setItem("user", JSON.stringify(response.data.payload));
        alert(response.data.message);
        navigate("/Home");
      }

      console.log("JWT Token:", response);
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response.status === 400) {
        if (
          error.response.data &&
          error.response.data.message &&
          error?.response?.data?.message?.non_field_errors
        ) {
        } else if (
          error.response.data.message &&
          error.response.data.message.email &&
          error.response.data.message.password
        ) {
          setErrorMessage1(error?.response?.data?.message?.email?.[0]);
          setErrorMessage2(error?.response?.data?.message?.password?.[0]);
        } else {
          console.error(
            "Error message structure is different:",
            error.response.data
          );
          // Handle the error or set a default error message
        }
      }
      setErrorMessage(error?.response?.data?.message?.non_field_errors?.[0]);
    }
  };
  console.log(errorMessage);
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        login
                      </p>
                      {errorMessage && (
                        <p className="text-danger text-center">
                          {errorMessage}
                        </p>
                      )}
                      <div className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errorMessage1 && (
                              <p className="text-danger">{errorMessage1}</p>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                            {errorMessage2 && (
                              <p className="text-danger">{errorMessage2}</p>
                            )}
                          </div>
                        </div>
                        <Link to="/Signup">Please Register Here</Link>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            onClick={() => handleLogin()}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sampleimage"
                      />
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

export default Login;
