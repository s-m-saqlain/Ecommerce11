import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPass from "./Components/ForgotPass";
import AdminOtp from "./Components/AdminOtp"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Signup />
      <Login /> */}
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path='/ForgotPass' element={<ForgotPass />}></Route>
            <Route path='/AdminOtp' element={<AdminOtp />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;



