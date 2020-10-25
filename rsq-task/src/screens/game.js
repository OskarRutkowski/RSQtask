import React from 'react';
import '../styles/game.css';
import { initTable } from '../components/helpers';
import TopNavigation from '../components/top-navigation';
import PlayField from '../components/play-field';

class Game extends React.Component {
  state = {
    playTable: [],
    score: 0,
    incomingScore: 0,
  };

  componentDidMount() {
    const { level } = this.props.match.params;
    let playTable = initTable(level);
    this.setPlayTable(playTable);
  }

  componentWillUnmount() {
    this.setState({
      score: 0,
      playTable: [],
    });
  }

  setPlayTable = (playTable) => {
    this.setState({
      playTable: playTable,
    });
  };

  setScore = (value) => {
    const { score } = this.state;
    this.setState({
      score: score + value,
      incomingScore: value,
    });
  };

  render() {
    const { level } = this.props.match.params;
    const { playTable, score, incomingScore } = this.state;
    return (
      <div className="App">
        <TopNavigation
          score={score}
          level={level}
          incomingScore={incomingScore}
        />
        <PlayField
          level={level}
          playTable={playTable}
          setPlayTable={(playTable) => this.setPlayTable(playTable)}
          setScore={(score) => this.setScore(score)}
        />
      </div>
    );
  }
}

export default Game;
