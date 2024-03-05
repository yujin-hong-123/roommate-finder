import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Profile from './Profile'
import EditProfile from './EditProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Profile />}> </Route>
          <Route path="/EditProfile" element={<EditProfile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
