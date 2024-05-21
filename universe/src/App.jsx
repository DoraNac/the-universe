import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import RegisterLogin from "./components/Register-Login";
import { AuthProvider, useAuth } from "./services/utils/AuthContext";
import CreateOrExplore from "./components/Create-or-Explore";
import CreateUniverse from "./components/Create-Universe-Form";
import SuccessfulUniverse from "./components/Successful-Universe";
import UserProfile from "./components/User-Profile.jsx";
import PostForm from "./components/Create-Post-Form";
import EditUniverse from "./components/Edit-Universe-Form";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterLogin />} />
          <Route
            path="/createorexplore"
            element={
              <PrivateRoute>
                <CreateOrExplore />
              </PrivateRoute>
            }
          />
          <Route
            path="/universe"
            element={
              <PrivateRoute>
                <CreateUniverse />
              </PrivateRoute>
            }
          />
          <Route
            path="/universe/:universeId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/successfuluniverse"
            element={
              <PrivateRoute>
                <SuccessfulUniverse />
              </PrivateRoute>
            }
          />
          <Route
            path="/edituniverse"
            element={
              <PrivateRoute>
                <EditUniverse />
              </PrivateRoute>
            }
          />
          <Route
            path="/createpost"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
