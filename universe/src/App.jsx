import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import RegisterLogin from "./components/Register-Login";
// import Login from "./components/Login";
// import HomePage from "./components/HomePage"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterLogin />} />
     
        {/* <Route path="/homepage" element={<HomePage/>} />  */}
    
      </Routes>
    </Router>
  );
}

export default App;
