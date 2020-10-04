export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  subscribe(event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== cb);
    };
  }
    
}

// const emitter = new Emitter();
// emitter.subscribe('hello', data => console.log('hello', data));
// emitter.subscribe('hello', data => console.log('hello1', data + 1));
//
// emitter.emit('hello', 23);