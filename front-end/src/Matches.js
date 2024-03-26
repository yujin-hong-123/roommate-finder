import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./Matches.css"
import Header from "./Header"
import profilepic from './ProfilePic.png';

const Matches = props => {
  const navigate = useNavigate();

  const [Message, setMessage] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')

  const fetchMatches = () => {
    setMessage(["HELLO"])

    axios
    .get('http://localhost:3001/matches')
    .then(response => {
      // axios bundles up all response data in response.data property
      const Message = response.data.message
      setMessage(response.data.message)
    })
    .catch(err => {
      const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
      setError(errMsg)
    })
    .finally(() => {
      // the response has been received, so remove the loading icon
      setLoaded(true)
    })
  }

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
    <h1>{error}</h1>
    <br></br>
    <div className="MatchList">
        <Header />
        <h1>{Message}</h1> <br></br>
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            
            <li className="username_match">Name1</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
      </div>
    </>
    
  )
}


export default Matches