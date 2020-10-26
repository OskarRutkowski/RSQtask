import React from 'react';
import '../styles/play-field.css';
import { checkLevel } from '../components/helpers';
import Brick from '../components/brick';
import { observer, inject } from 'mobx-react';

class PlayField extends React.Component {
  refillColumns = (currentArea) => {
    const {
      level,
      playTable,
      addScore,
      setIncomingScore,
      setTableColorField,
    } = this.props.store;
    playTable.forEach((rows) => {
      rows.forEach((rowItem) => {
        if (
          currentArea.find(
            (item) => rowItem.x === item.x && rowItem.y === item.y
          )
        ) {
          for (let u = rowItem.x; u >= 0; u--) {
            if (u - 1 < 0) {
              setTableColorField(
                u,
                rowItem.y,
                Math.floor(Math.random() * checkLevel(level).randomNum)
              );
            } else {
              setTableColorField(
                u,
                rowItem.y,
                playTable[u - 1][rowItem.y].colorKey
              );
            }
          }
        }
      });
    });
    addScore(currentArea.length);
    setIncomingScore(currentArea.length);
  };

  render() {
    const { playTable } = this.props.store;
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

export default inject('store')(observer(PlayField));
