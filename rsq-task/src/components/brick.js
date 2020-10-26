import React from 'react';
import '../styles/brick.css';
import { observer, inject } from 'mobx-react';
import { selectColor } from './helpers';

class Brick extends React.Component {
  state = {
    currentArea: [],
  };

  setCurrnetArea = (value) => {
    this.setState({ currentArea: value });
  };

  addToCurrentArea = (connectedNeighbor) => {
    const { currentArea } = this.state;
    let temp = currentArea;
    if (
      !temp.find(
        (item) =>
          item.x === connectedNeighbor.x && item.y === connectedNeighbor.y
      )
    ) {
      temp.push(connectedNeighbor);
      this.setCurrnetArea(temp);
    }
  };

  recurseCheckNeighbors(myArray, i, j, oldPropTable) {
    var rowLimit = myArray.length - 1;
    var columnLimit = myArray[0].length - 1;
    for (var x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (var y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
        if (
          (x !== i || y !== j) && // if block is not clicked block
          (x !== i + 1 || y !== j - 1) && // if block is not diagonally
          (x !== i + 1 || y !== j + 1) && // if block is not diagonally
          (x !== i - 1 || y !== j - 1) && // if block is not diagonally
          (x !== i - 1 || y !== j + 1) && // if block is not diagonally
          !oldPropTable.find((element) => element.x === x && element.y === y) // if block is not the one from which recurse comes
        ) {
          if (myArray[x][y].colorKey === myArray[i][j].colorKey) {
            this.addToCurrentArea({
              colorKey: myArray[x][y].colorKey,
              x: x,
              y: y,
            });
            this.recurseCheckNeighbors(myArray, x, y, [
              { x: i, y: j },
              ...oldPropTable,
            ]);
          }
        }
      }
    }
  }

  findingNeighbors(myArray, i, j) {
    const { removeConnected } = this.props;
    const rowLimit = myArray.length - 1;
    const columnLimit = myArray[0].length - 1;

    for (var x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (var y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
        if (
          (x !== i || y !== j) && // if block is not clicked block
          (x !== i + 1 || y !== j - 1) && // if block is not diagonally
          (x !== i + 1 || y !== j + 1) && // if block is not diagonally
          (x !== i - 1 || y !== j - 1) && // if block is not diagonally
          (x !== i - 1 || y !== j + 1) // if block is not diagonally
        ) {
          if (myArray[x][y].colorKey === myArray[i][j].colorKey) {
            this.addToCurrentArea({
              colorKey: myArray[x][y].colorKey,
              x: x,
              y: y,
            }); // add vertical & horizontal blocks
            this.recurseCheckNeighbors(myArray, x, y, [{ x: i, y: j }]); // recurse find rest of connected neighbors
          }
        }
      }
    }
    if (this.state.currentArea.length > 0) {
      this.addToCurrentArea({ colorKey: myArray[i][j].colorKey, x: i, y: j }); // add clicked block
    }
    removeConnected(this.state.currentArea);
    this.setCurrnetArea([]);
  }

  render() {
    const { colorKey, x, y } = this.props;
    const { playTable } = this.props.store;
    return (
      <button
        className="brick-container"
        style={{ backgroundColor: selectColor(colorKey) }}
        onClick={() => this.findingNeighbors(playTable, x, y)}
      ></button>
    );
  }
}

export default inject('store')(observer(Brick));
