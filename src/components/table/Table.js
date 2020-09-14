import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
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
  onMousedown(e) {
    // console.log(e.target.getAttribute('data-resize'));
    const resize = e.target.dataset.resize;
    if (resize){
      if (resize === 'col') {
        const $resizer = $(e.target);
        // const $parent = $resizer.$el.parentNode; //bad
        // const $parent = $resizer.$el.closest('.column');// bad
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = ($parent.getCoords());
        const $cells = this.$root.findAll(`[data-key=${$parent.data.innerText}]`);

        document.onmousemove = e => {
          const delta = e.pageX - coords.right;
          const width = `${coords.width + delta}px`;
          $parent.data.style.width = width;
          $cells.forEach($cellElement => $cellElement.style.width = width);
        };

        document.onmouseup = () => {
          document.onmousemove = null;
        };
      }
      if (resize === 'row') {
        const $resizer = $(e.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = ($parent.getCoords());

        document.onmousemove = e => {
          const delta = e.pageY - coords.bottom;
          $parent.data.style.height = `${coords.height + delta}px`;
        };

        document.onmouseup = () => {
          document.onmousemove = null;
        };
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
