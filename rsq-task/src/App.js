import React from 'react';
import logo from './logo.svg';
import './App.css';
import Brick from './components/brick';

const initTable = (level) => {
  let table;
  if (level === 'easy') {
    // init table
    table = new Array(10);
    for (let i = 0; i < 10; i++) {
      table[i] = new Array(10);
    }

    // fulfill table
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let randomKey = Math.floor(Math.random() * 5);
        table[i][j] = { colorKey: randomKey, x: i, y: j };
      }
    }
  }
  return table;
};

class App extends React.Component {
  state = {
    playTable: [],
  };

  componentDidMount() {
    let playTable = initTable('easy');
    this.setPlayTable(playTable);
  }

  setPlayTable = (playTable) => {
    this.setState({
      playTable: playTable,
    });
  };

  replaceVertical = (playTable, i, j) => {
    const rowLimit = playTable.length - 1;
    const columnLimit = playTable[0].length - 1;

    for (var x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (
        var y = Math.max(0, j - 1);
        y <= Math.min(j + 1, columnLimit);
        y++
      ) {}
    }
    return { colorKey: undefined, x: 0, y: 0 };
  };

  removeConnected = (currentArea) => {
    const { playTable } = this.state;
    console.log('currnet', currentArea);
    let tempTable = playTable;
    playTable.forEach((rows) => {
      rows.forEach((rowItem) => {
        if (
          currentArea.find(
            (item) => rowItem.x === item.x && rowItem.y === item.y
          )
        ) {
          tempTable[rowItem.x][rowItem.y] = this.replaceVertical(
            playTable,
            rowItem.x,
            rowItem.y
          );
        }
      });
    });
    this.setState({
      playTable: tempTable,
    });
  };

  render() {
    const { playTable } = this.state;
    let temp = playTable;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {temp.map((column) => {
          return (
            <div>
              {column.map((row) => {
                return (
                  <Brick
                    colorKey={row.colorKey}
                    x={row.x}
                    y={row.y}
                    table={temp}
                    removeConnected={(currentArea) =>
                      this.removeConnected(currentArea)
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

export default App;
