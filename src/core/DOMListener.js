import { capitalize } from '@core/util';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) throw new Error('$root not found');
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      if(!this[methodName]) {
        throw new Error(`Method ${methodName} not find.`);
      }
      //Биндим чтобы в наследников при вызове this[methodName](Formula.onClick)
      //передать this (контекст), чтобы вызвать this.$root
      //bind возвращает новый метод поэтому мы присваиваем this[methodName] = this[methodName].bind(this)
      this[methodName] = this[methodName].bind(this);
      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener);
      this.$root.off(listener, this[methodName]);
    });
  }
}

const getMethodName = (eventName) => {
  return `on${capitalize(eventName)}`;
};
