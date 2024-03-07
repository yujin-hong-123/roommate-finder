import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./Matches.css"
import Header from "./Header"
import profilepic from './ProfilePic.png';

function Matches() {
  const navigate = useNavigate();

    return (
      <div className="MatchList">
        <Header />
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            <li className="username_match">Name1</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            <li className="username_match">Name2</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            <li className="username_match">Name3</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            <li className="username_match">Name4</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            <li className="username_match">Name5</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            <li className="username_match">Name6</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/otheruser')} className="rowbutton">
          <img src={profilepic} className="profilepic_match" alt="profilepic" />
          <ul className="matchentry">
            <li className="username_match">Name7</li>
            <li className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
      </div>
    );
  }

export default Matches