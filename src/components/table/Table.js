import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners:[ 'mousedown', 'keydown', 'input' ],
      ...options
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
    this.selectCell($cell);
    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on('formula:enterDown', () => {
      this.selection.current.focus();
    });
  }

  selectCell($elem) {
    this.selection.select($elem);
    this.$emit('table:select', $elem);
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

  onKeydown(e){
    const keys = [ 'Enter', 'Tab', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight' ];
    if(keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      const { key } = e;
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(e) {
    this.$emit('table:input', $(e.target));
  }

}

const nextSelector = (key, { col, row }) => {
  const calculation = (action, num) => {
    const MIN_VALUE = 0;
    if(action === '-') return num - 1 < MIN_VALUE ? MIN_VALUE : --num;
    return ++num;
  };

  return {
    'Enter': () => `[data-id="${calculation('+', row)}:${col}"]`,
    'Tab': () => `[data-id="${row}:${calculation('+', col)}"]`,
    'ArrowDown': () => `[data-id="${calculation('+', row)}:${col}"]`,
    'ArrowUp': () => `[data-id="${calculation('-', row)}:${col}"]`,
    'ArrowLeft': () => `[data-id="${row}:${calculation('-', col)}"]`,
    'ArrowRight': () => `[data-id="${row}:${calculation('+', col)}"]`
  }[key]();
};

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