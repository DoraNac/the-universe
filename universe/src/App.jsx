import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import RegisterLogin from "./components/Register-Login";
import { AuthProvider, useAuth } from "./services/utils/AuthContext";
import CreateOrExplore from "./components/Create-or-Explore";
import CreateUniverse from "./components/Create-Universe-Form";
// import SuccessfulUniverse from "./components/Successful-Universe";
import UserProfile from "./components/User-Profile.jsx";
import PostForm from "./components/Create-Post-Form";
import EditUniverse from "./components/EditUniverseForm.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ExploreOthers from "./components/Explore-Others.jsx";
import BackgroundAnimation from "./components/BackgroundAnimation";
import BackgroundMusic from "./components/BackgroundMusic";
import FinalOthers from "./components/FinalExploreOthers.jsx";
import FinalPost from "./components/FinalExplorePost.jsx";

function App() {
  return (
    
    <AuthProvider>
      <Router>
      <BackgroundMusic />
      <BackgroundAnimation /> 
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
            path="/exploreothers"
            element={
              <PrivateRoute>
                <ExploreOthers />
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
            path="/finalpost"
            element={
              <PrivateRoute>
                < FinalPost/>
              </PrivateRoute>
            }
          />
            <Route
            path="/final"
            element={
              <PrivateRoute>
                <FinalOthers />
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
            path="/universe/:universeId/createpost"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/universe/:universeId/edituniverse"
            element={
              <PrivateRoute>
                <EditUniverse />
              </PrivateRoute>
            }
          />
         
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
