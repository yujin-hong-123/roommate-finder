import React from "react";
import './ChatBox.css'

export function ChatBoxSender({message}) {
    return (
        <div className="SenderBox">
            <p className="SenderChat">
                <strong className="ChatUsername">
                    Username [10:00AM]
                </strong>
                <br/>
                {message}
            </p>
        </div>
    );
}

export function ChatBoxReceiver({message}) {
    return (
        <div className="ReceiverBox">
            <p className="ReceiverChat">
                <strong className="ChatUsername">
                    Username [10:01AM]
                </strong>
                <br/>
                {message}
            </p>
        </div> 
    );
}