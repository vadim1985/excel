const CODES = {
  A: 65,
  Z: 90
};

const toCell = (el) => {
  return `
    <div class="cell" contenteditable data-key="${el}"></div>
  `;
};

const toColumn = (el) => {
  return `
    <div class="column" data-type="resizable">
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>  
  `;
};

const createRow = (rowData, rowInfo = '') => {
  const resizer = rowInfo ? '<div class="row-resize" data-resize="row" ></div>' : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowInfo}
        ${resizer}
      </div>
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
  const cells = new Array(colsCount).fill('').map(toChar).map(toCell).join('');

  rows.push(createRow(cols));
  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(cells, i + 1));
  }
  return rows.join('');
};