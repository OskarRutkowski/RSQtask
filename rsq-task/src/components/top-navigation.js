import React from 'react';
import '../styles/top-navigation.css';
import { checkLevel } from '../components/helpers';
import CountUp from 'react-countup';
import { observer, inject } from 'mobx-react';

class TopNavigation extends React.Component {
  render() {
    const { score, incomingScore, level } = this.props.store;
    return (
      <div className="topnav">
        <a
          className="active"
          href="/"
          style={{ backgroundColor: checkLevel(level).color }}
        >
          <i className="fas fa-angle-double-left"></i>
        </a>
        <div className="score-container">
          <a className="text">Your score:</a>
          <a className="text">
            <CountUp
              start={score - incomingScore}
              end={score}
              duration={1}
            ></CountUp>
          </a>
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(TopNavigation));
