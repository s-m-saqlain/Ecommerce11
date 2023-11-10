import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;



