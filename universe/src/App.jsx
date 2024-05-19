import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import RegisterLogin from "./components/Register-Login";
import { AuthProvider, useAuth } from "./services/utils/AuthContext"
import CreateOrExplore from "./components/Create-or-Explore";
import CreateUniverse from "./components/Create-Universe-Form";
import SuccessfulUniverse from "./components/Successful-Universe";
import PostForm from "./components/Create-Post-Form";
import EditUniverse from "./components/Edit-Universe-Form";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterLogin />} />
          <PrivateRoute path="/createorexplore" element={<CreateOrExplore />} />
          <PrivateRoute path="/createuniverse" element={<CreateUniverse />} />
          <PrivateRoute path="/edituniverse" element={<EditUniverse />} />
          <PrivateRoute path="/successfuluniverse" element={<SuccessfulUniverse />} />
          <PrivateRoute path="/createpost" element={<PostForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
