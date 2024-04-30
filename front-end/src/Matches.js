import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./Matches.css"
import Header from "./Header"
import profilepic from './ProfilePic.png';
import bear from './assets/bear.png';
import cat from './assets/cat.png';
import dog from './assets/dog.png';
import duck from './assets/duck.png';
import panda from './assets/panda.png';
import rabbit from './assets/rabbit.png'

const Matches = props => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [matches, setMatches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMatches = async () => {
    try {
      const response = await axios.get('http://{$process.env.HOST}:3001/matches', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Fetching profile data', response.data);
      if (response.data) {
        setMatches(response.data);
      } else {
        throw new Error('Matches data is missing');
      }
    } catch (error) {
      console.error('Error fetching matches data:', error);
      setError('Error fetching matches data: ' + error.message);
    }
  };

  useEffect(() => {
    // fetch messages this once
    fetchMatches()

    // set a timer to load data from server every n seconds
    const intervalHandle = setInterval(() => {
      fetchMatches()
    }, 5000)

    // return a function that will be called when this component unloads
    return e => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
      clearInterval(intervalHandle)
    }
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  const handleClick = async (match) => {
    console.log("Sending data of user: ", match.username);

    try {
      const response = await axios.post('http://{$process.env.HOST}:3001/matches', match, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include the JWT token in the request
        }
      });
      console.log("Update response:", response.data);
      if (response.status === 200) {
        console.log("Match info sent successfully");
        navigate('/otheruser', { state: { updated: true } }); // Pass state to trigger re-fetch
      }
    } catch (error) {
      console.error("Update error:", error);
      const message = error.response?.data?.message || "An error occurred while updating the profile.";
      setErrorMessage(message);
    }
  };

  const avatarMap = {
    'bear': bear,
    'cat': cat,
    'dog': dog,
    'duck': duck,
    'panda': panda,
    'rabbit': rabbit,
    '': profilepic
  };

  return (
    <>
      <div className="MatchList">
        <Header />
        {error && <h1>{error}</h1>} {/* To fix allignment I made error only show up if it is defined*/}
        {matches.map((match, index) => (
          <div key={index}>
            <button onClick={() => handleClick(match)} className="rowbutton">
              <img src={avatarMap[match.profile.picture]} className="profilepic_match" alt="profilepic" />
              <ul className="matchentry">
                <li className="username_match">{match.profile.name}</li>
                <li className="bio">{match.profile.bio}</li>
              </ul>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};


export default Matches