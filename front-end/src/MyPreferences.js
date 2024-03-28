
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
//import "./Survey.css";
import Header from "./Header";
import axios from 'axios'

const MyPreferences = props => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [feedback, setFeedback] = useState('')
    const [preferences, setPreferences] = useState([]);
    const fetchPreferences = () => {

        axios
            .get('http://localhost:3001/mypreferences')
            .then(response => {
                const preferencesData = response.data; //response is an array of JSON objects
                setPreferences(preferencesData);
            })
            .catch(err => {
                const errMsg = JSON.stringify(err, null, 2);
                setError(errMsg);
            })
            .finally(() => {
                setLoaded(true);
            });
    };

    useEffect(() => {
        // fetch messages this once
        fetchPreferences()

        // set a timer to load data from server every n seconds
        const intervalHandle = setInterval(() => {
            fetchPreferences()
        }, 5000)

        // return a function that will be called when this component unloads
        return e => {
            // clear the timer, so we don't still load messages when this component is not loaded anymore
            clearInterval(intervalHandle)
        }
    }, []) // putting a blank array as second argument will cause this function to run only once when component first loads




    const handleSubmit = () => {
        navigate('/profile');
    };


    return (
        <div>
            <Header />
            <h2>My Preferences</h2>
            <p>Are you okay with pets? {preferences.pets}</p>
            <p>Open to guests? {preferences.guests}</p>
            <p>Minimum Rent Share: ${preferences.rent_min}</p>
            <p>Maximum Rent Share: ${preferences.rent_max}</p>
            <p>Desired number of roommates (excluding yourself): {preferences.roommates}</p>
            <p>Usual bedtime: {preferences.bedtime}</p>

            <button onClick={handleSubmit}>Back to My Profile</button>
        </div>

    );
}

export default MyPreferences;
