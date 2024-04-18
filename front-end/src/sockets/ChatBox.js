import React from "react";
import './ChatBox.css'

export function ChatBoxSender({user, message}) {
    return (
        <div className="SenderBox">
            <p className="SenderChat">
                <strong className="ChatUsername">
                    {user} [10:00 AM]
                </strong>
                <br/>
                {message}
            </p>
        </div>
    );
}

export function ChatBoxReceiver({user, message}) {
    return (
        <div className="ReceiverBox">
            <p className="ReceiverChat">
                <strong className="ChatUsername">
                    {user} [10:00 AM]
                </strong>
                <br/>
                {message}
            </p>
        </div> 
    );
}