import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';

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
  onMousedown(e) {
    // console.log(e.target.getAttribute('data-resize'));
    const resize = e.target.dataset.resize;
    if (resize){
      resizeHandler(this.$root, e);
    }
  }

  onClick(e){
    console.log(e);
  }

  onMousemove(e){
    console.log(e);
  }
}
