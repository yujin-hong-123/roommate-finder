import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ChatPage from './ChatPage';
import ChatList from './ChatList'
import Matches from './Matches';
import Survey from './Survey';
import Profile from './Profile'

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
        {/* Redirect all other paths to "/login" */}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
