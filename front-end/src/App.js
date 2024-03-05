import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Profile from './Profile'
import TopMatches from './TopMatches'
import Header from './Header'


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Profile />}> </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
