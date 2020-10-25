import React from 'react';
import '../styles/brick.css';

class Brick extends React.Component {
  state = {
    currentArea: [],
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
      this.setState({
        currentArea: temp,
      });
    }
  };

  selectColor = (colorKey) => {
    switch (colorKey) {
      case 0:
        return '#FB8F67';
      case 1:
        return '#F8E16C';
      case 2:
        return '#00C49A';
      case 3:
        return '#0081AF';
      case 4:
        return '#FF4A1C';
      case 5:
        return '#922D50';
      case 6:
        return '#2B4162';
      default:
        return '#000';
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
    console.log('CURRENTAREA', this.state.currentArea);
    removeConnected(this.state.currentArea);
    this.setState({ currentArea: [] });
  }

  render() {
    const { colorKey, x, y, table } = this.props;
    return (
      <button
        className="brick-container"
        style={{ backgroundColor: this.selectColor(colorKey) }}
        onClick={() => this.findingNeighbors(table, x, y)}
      ></button>
    );
  }
}

export default Brick;
