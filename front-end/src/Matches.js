import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./Matches.css"
import Header from "./Header"
import profilepic from './ProfilePic.png';

const Matches = props => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [matches, setMatches] = useState([]);

  const fetchMatches = async() => {
    try {
      const response = await axios.get('http://localhost:3001/matches', {
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


    // axios
    //   .get('http://localhost:3001/matches')//, { withCredentials: true})
    //   .then(response => {
    //     const matchesData = response.data; //response is an array of JSON objects
    //     setMatches(matchesData);
    //   })
    //   .catch(err => {
    //     const errMsg = JSON.stringify(err, null, 2);
    //     setError(errMsg);
    //   })
    //   .finally(() => {
    //     setLoaded(true);
    //   });
    
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

  return (
    <>
      <div className="MatchList">
        <Header />
        {error && <h1>{error}</h1>} {/* To fix allignment I made error only show up if it is defined*/}
        {matches.map((match, index) => (
          <div key={index}>

            <button onClick={() => navigate('/otheruser')} className="rowbutton">
              <img src={profilepic} className="profilepic_match" alt="profilepic" />
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