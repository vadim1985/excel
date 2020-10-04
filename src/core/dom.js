class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if(typeof  html === 'string'){
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  get data() {
    return this.$el.dataset;
  }

  text(text) {
    if(typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if(this.$el.tagName.toLowerCase() === 'input') return this.$el.value.trim();
    return this.$el.textContent.trim();
  }

  id(parse) {
    if (parse) {
      const cellCoords = this.id().split(':');
      return {
        row: +cellCoords[0],
        col: +cellCoords[1]
      };
    }
    return this.data.id;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  
  focus() {
    this.$el.focus();
    return this;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  css(style={}) {
    for (const key in style) {
      this.$el.style[key] = style[key];
    }
  }

  on(event, callback) {
    this.$el.addEventListener(event, callback);
  }

  off(event, callback) {
    this.$el.removeEventListener(event, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else  {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
