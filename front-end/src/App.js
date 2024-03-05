import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Profile from './Profile'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Profile />}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
