import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import "./Home.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <div>
      <section id="landing" class="main-section">
        <h1 id="landing-app-name">LIT</h1>
        <div class="landing-text-container" id="ask-container">
            <h3 class="landing-subtitle" id="landing-ask">Ask</h3>
            <h4 class="landing-sentence" id="landing-ask-text">Discover what people think of you.</h4>
        </div>
        <div class="landing-text-container" id="answer-container">
            <h3 class="landing-subtitle" id="landing-answer">Answer</h3>
            <h4 class="landing-sentence" id="landing-answer-text">Let people know what you think of them.</h4>
        </div>
        <div class="landing-text-container" id="admire-container">
            <h3 class="landing-subtitle" id="landing-admire">Admire</h3>
            <h4 class="landing-sentence" id="landing-admire-text">Check out who stands at the top.</h4>
        </div>
        <div class="landing-buttons">
            <h4 class="landing-button-text" id="early-access-text">
              {isLoggedIn && <p id="early-access-button"><Link to="/private">Early Access</Link></p>}
            </h4>
        </div>
      </section>
    </div>
  )
}
