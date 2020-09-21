const CODES = {
  A: 65,
  Z: 90
};

const toCell = (row) => {
  return (_, item) =>`
    <div 
    class="cell" 
    contenteditable 
    data-cell="${item}" 
    data-type="cell" 
    data-id="${row}:${item}">
</div>
  `;
};

const toColumn = (el, index) => {
  return `
    <div class="column" data-type="resizable" data-index="${index}">
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

  rows.push(createRow(cols));
  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell(i)).join('');
    rows.push(createRow(cells, i + 1));
  }
  return rows.join('');
};