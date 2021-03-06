const checkLevel = (level) => {
  let color, randomNum;
  switch (level) {
    case 'easy':
      color = '#edc79b';
      randomNum = 3;
      break;
    case 'mid':
      color = '#63a375';
      randomNum = 5;
      break;
    case 'hard':
      color = '#d57a66';
      randomNum = 7;
      break;
    default:
      color = '#d57a66';
      randomNum = 1;
      break;
  }
  return { color: color, randomNum: randomNum };
};

const selectColor = (colorKey) => {
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

const initArray = (length) => {
  let table = new Array(length);
  for (let i = 0; i < length; i++) {
    table[i] = new Array(length);
  }
  return table;
};

const fulfillArray = (length, table, colorLevel) => {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let randomKey = Math.floor(Math.random() * colorLevel);
      table[i][j] = { colorKey: randomKey, x: i, y: j };
    }
  }
  return table;
};

const initTable = (level) => {
  let table, newTable;
  switch (level) {
    case 'easy':
      newTable = initArray(5);
      table = fulfillArray(5, newTable, 3);
      break;
    case 'mid':
      newTable = initArray(7);
      table = fulfillArray(7, newTable, 5);
      break;
    case 'hard':
      newTable = initArray(10);
      table = fulfillArray(10, newTable, 7);
      break;
    default:
      break;
  }
  return table;
};

export { checkLevel, initArray, fulfillArray, initTable, selectColor };
