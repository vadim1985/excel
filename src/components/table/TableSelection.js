export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  select($el) {
    this.clear();
    this.current = $el;
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  selecrGroup($el = []) {
    this.clear();
    this.group = $el;
    this.group.forEach(elem => elem.addClass(TableSelection.className));
  }
}