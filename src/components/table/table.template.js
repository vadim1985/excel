const CODES = {
  A: 65,
  Z: 90
};

const toCell = () => {
  return `
    <div class="cell" contenteditable></div>
  `;
};

const toColumn = (el) => {
  return `
    <div class="column">${el}</div>  
  `;
};

const createRow = (rowData, rowInfo = '') => {
  return `
    <div class="row">
      <div class="row-info">${rowInfo}</div>
      <div class="row-data">${rowData}</div>
    </div>  
  `;
};

const toChar = (_ , i) => {
  return String.fromCharCode(CODES.A + i);
};

export const createTable = (rowCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');
  const cells = new Array(colsCount).fill('').map(toCell).join('');

  rows.push(createRow(cols));
  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(cells, i + 1));
  }
  return rows.join('');
};