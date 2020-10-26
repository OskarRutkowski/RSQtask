import { makeAutoObservable } from 'mobx';

export default class GameStore {
  level = '';
  score = 0;
  incomingScore = 0;
  playTable = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLevel = (level) => {
    this.level = level;
  };

  setPlayTable = (playTable) => {
    this.playTable = playTable;
  };

  setTableColorField = (x, y, value) => {
    this.playTable[x][y].colorKey = value;
  };

  clearPlayTable = () => {
    this.playTable = [];
  };

  addScore = (value) => {
    this.score = this.score + value;
  };

  setIncomingScore = (value) => {
    this.incomingScore = value;
  };

  clearScores = () => {
    this.score = 0;
    this.incomingScore = 0;
  };
}
