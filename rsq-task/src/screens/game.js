import React from 'react';
import '../styles/game.css';
import { initTable } from '../components/helpers';
import TopNavigation from '../components/top-navigation';
import PlayField from '../components/play-field';
import { observer, inject } from 'mobx-react';

class Game extends React.Component {
  componentDidMount() {
    const { level } = this.props.match.params;
    const { setLevel, setPlayTable } = this.props.store;
    setLevel(level);
    setPlayTable(initTable(level));
  }

  componentWillUnmount() {
    const { clearPlayTable, clearScores } = this.props.store;
    clearPlayTable();
    clearScores();
  }

  render() {
    return (
      <div className="App">
        <TopNavigation />
        <PlayField />
      </div>
    );
  }
}

export default inject('store')(observer(Game));
