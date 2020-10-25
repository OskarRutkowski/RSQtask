import React from 'react';
import '../styles/play-field.css';
import { checkLevel } from '../components/helpers';
import Brick from '../components/brick';

class PlayField extends React.Component {
  refillColumns = (currentArea) => {
    const { level, playTable, setPlayTable, setScore } = this.props;
    playTable.forEach((rows) => {
      rows.forEach((rowItem) => {
        if (
          currentArea.find(
            (item) => rowItem.x === item.x && rowItem.y === item.y
          )
        ) {
          for (let u = rowItem.x; u >= 0; u--) {
            if (u - 1 < 0) {
              playTable[u][rowItem.y].colorKey = Math.floor(
                Math.random() * checkLevel(level).randomNum
              );
            } else {
              playTable[u][rowItem.y].colorKey =
                playTable[u - 1][rowItem.y].colorKey;
            }
          }
        }
      });
    });
    setPlayTable(playTable);
    setScore(currentArea.length);
  };

  render() {
    const { playTable } = this.props;
    return (
      <div className="play-field">
        {playTable.map((rows) => {
          return (
            <div key={`row-${rows[0].x}`} className="rows">
              {rows.map((row) => {
                return (
                  <Brick
                    key={`key-${row.x}-${row.y}`}
                    colorKey={row.colorKey}
                    x={row.x}
                    y={row.y}
                    table={playTable}
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
    );
  }
}

export default PlayField;
