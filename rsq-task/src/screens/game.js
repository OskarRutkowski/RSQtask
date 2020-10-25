import React from 'react';
import './game.css';
import Brick from '../components/brick';
import { checkLevel, initTable } from '../components/helpers';

class Game extends React.Component {
  state = {
    playTable: [],
    score: 0,
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
    });
  };

  refillColumns = (currentArea) => {
    const { level } = this.props.match.params;
    const { playTable } = this.state;
    let tempTable = playTable;
    playTable.forEach((rows) => {
      rows.forEach((rowItem) => {
        if (
          currentArea.find(
            (item) => rowItem.x === item.x && rowItem.y === item.y
          )
        ) {
          for (let u = rowItem.x; u >= 0; u--) {
            if (u - 1 < 0) {
              tempTable[u][rowItem.y].colorKey = Math.floor(
                Math.random() * checkLevel(level).randomNum
              );
            } else {
              tempTable[u][rowItem.y].colorKey =
                tempTable[u - 1][rowItem.y].colorKey;
            }
          }
        }
      });
    });
    this.setPlayTable(tempTable);
    this.setScore(currentArea.length);
  };

  render() {
    const { level } = this.props.match.params;
    const { playTable, score } = this.state;
    let temp = playTable;
    return (
      <div className="App">
        <div class="topnav">
          <a
            class="active"
            href="/"
            style={{ backgroundColor: checkLevel(level).color }}
          >
            <i class="fas fa-angle-double-left"></i>
          </a>
          <div class="score-container">{score}</div>
        </div>
        <div className="play-field">
          {temp.map((rows) => {
            return (
              <div className="rows">
                {rows.map((row) => {
                  return (
                    <Brick
                      colorKey={row.colorKey}
                      x={row.x}
                      y={row.y}
                      table={temp}
                      removeConnected={(currentArea) =>
                        this.refillColumns(currentArea)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Game;
