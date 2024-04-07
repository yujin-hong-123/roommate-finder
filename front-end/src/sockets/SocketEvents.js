import React from "react";

export function SocketEvents({events}) {
    return (
        <ul>
            {
            events.map((event, index) => 
            <li key={index}> {event} </li>)
            }
        </ul>
    );
}