import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners:[ 'mousedown' ]
    });
  }
  toHTML() {
    return createTable(100);
  }
  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    console.log('init');
  }

  onMousedown(e) {
    // console.log(e.target.getAttribute('data-resize'));
    const resize = e.target.dataset.resize;
    if (resize){
      resizeHandler(this.$root, e);
    }
    if(e.target.dataset.type === 'cell') {
      const $select = $(e.target);
      if (e.shiftKey) {
        const current = this.selection.current.id(true); //текущяя ячейка
        const target = $select.id(true); // последняя ячейка
        const ids = matrix(current, target); // собираем id выделенных элементов
        this.selection.selecrGroup(ids.map(id => this.$root.find(`[data-id="${id}"]`))); // ищем ячейки с нужным id и выделяем
      } else {
        this.selection.select($select);
      }
    }
  }

  onClick(e){
    console.log(e);
  }

  onMousemove(e){
    console.log(e);
  }
}
const matrix = (current, target) => {
  const cols = range(current.col, target.col);
  console.log(cols);
  const rows = range(current.row, target.row);
  return  cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
};
const range = (start, end) => {
  if (start > end) {
    [ end, start ] = [ start, end ];
  }
  return Array(end - start + 1)
    .fill('')
    .map((_, index) => index + start);
};