import React from 'react';
import '../styles/intro.css';
import { Link } from 'react-router-dom';

class Intro extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="welcome">Welcome to ClickColor game!</div>
        <div className="sub-welcome">Choose your difficulty level:</div>
        <div className="button-box">
          <Link to="/easy">
            <button className="button-container button1">
              <div>
                <i class="fas fa-umbrella-beach icon"></i>
              </div>
              <div className="link-text">Easy</div>
            </button>
          </Link>
          <Link to="/mid">
            <button className="button-container button2">
              <div>
                <i class="fas fa-book-reader icon"></i>
              </div>
              <div className="link-text">Mid</div>
            </button>
          </Link>
          <Link to="/hard">
            <button className="button-container button3">
              <div>
                <i class="fas fa-mountain icon"></i>
              </div>
              <div className="link-text">Hard</div>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Intro;
