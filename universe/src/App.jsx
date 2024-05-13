import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import RegisterLogin from "./components/Register-Login";
import CreateOrExplore from "./components/Create-or-Explore";
import CreateUniverse from "./components/Create-Universe-Form";
import SuccessfulUniverse from "./components/Successful-Universe";
import PostForm from "./components/Create-Post-Form";
import EditUniverse from "./components/Edit-Universe-Form";

// import HomePage from "./components/HomePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterLogin />} />
        <Route path="/createorexplore" element={<CreateOrExplore />} />
        <Route path="/createuniverse" element={<CreateUniverse />} />
        <Route path="edituniverse" element={<EditUniverse />} />
        <Route path="/successfuluniverse" element={<SuccessfulUniverse />} />
        <Route path="createpost" element={<PostForm />} />
       

        {/* <Route path="/homepage" element={<HomePage/>} />  */}
      </Routes>
    </Router>
  );
}

export default App;
