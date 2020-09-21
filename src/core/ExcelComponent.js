import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;

    this.prepare();
  }
  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  prepare() {

  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
