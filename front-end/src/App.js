import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ChatPage from './ChatPage';
import ChatList from './ChatList'
import Matches from './Matches';
import Survey from './Survey';
import Profile from './Profile'
import EditProfile from './EditProfile';
import MyPreferences from './MyPreferences'
import OtherProfile from './OtherProfile';
import EditProfile from './EditProfile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/survey" element={<Survey />} /> {/*PLEASE ADD A BUTTON TO THIS ON PROFILE SCREEN*/}
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/mypreferences" element={<MyPreferences />} />
        <Route path="/otheruser" element={<OtherProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        {/* Redirect all other paths to "/login" */}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
