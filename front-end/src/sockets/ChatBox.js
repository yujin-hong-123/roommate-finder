import React from "react";
import './ChatBox.css'

export function ChatBoxSender({user, time, message}) {
    return (
        <div className="SenderBox">
            <p className="SenderChat">
                <strong className="ChatUsername">
                    {user} [{time}]
                </strong>
                <br/>
                {message}
            </p>
        </div>
    );
}

export function ChatBoxReceiver({user, time, message}) {
    return (
        <div className="ReceiverBox">
            <p className="ReceiverChat">
                <strong className="ChatUsername">
                    {user} [{time}]
                </strong>
                <br/>
                {message}
            </p>
        </div> 
    );
}