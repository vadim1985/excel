import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
  }
  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  $emit(event, ...options) {
    this.emitter.emit(event, ...options);
  }

  $on(event, cb) {
    const unsub = this.emitter.subscribe(event, cb);
    this.unsubscribers.push(unsub);
  }

  prepare() {

  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
