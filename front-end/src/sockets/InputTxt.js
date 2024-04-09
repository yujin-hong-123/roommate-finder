import React, { useState } from "react";
import './InputTxt.css'

export default function InputTxt({sendMessage}) {
    const [message, setMessage] = useState('');

    function AddMessage() {
        sendMessage({message});
        setMessage('');
    }

    return (
        <div className="InputContainer">
            <textarea 
            className="InputTxtArea" 
            rows={6} 
            placeholder="Write here..." 
            value={message}
            onChange={e => setMessage(e.target.value)}>
            </textarea>
            <button className="InputButton" onClick={() => AddMessage()}>Send</button>
        </div>
    );
}