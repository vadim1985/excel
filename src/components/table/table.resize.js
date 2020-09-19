import { $ } from '@core/dom';

export const resizeHandler = ($root, e) => {
  const $resizer = $(e.target);
  // const $parent = $resizer.$el.parentNode; //bad
  // const $parent = $resizer.$el.closest('.column');// bad
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.dataset.resize;
  let finalCoords;
  $resizer.css({ opacity: 1 });
  if (type === 'col') {
    document.onmousemove = e => {
      const delta = e.pageX - coords.right;
      finalCoords = `${coords.width + delta}px`;
      $resizer.css({ right: `${-delta}px`, bottom: '-2000px' });
      // $parent.data.style.width = width;
    };
  }
  if (type === 'row') {
    document.onmousemove = e => {
      const delta = e.pageY - coords.bottom;
      $resizer.css({ bottom: `${-delta}px`, right: '-2000px' });
      finalCoords = `${coords.height + delta}px`;
      // $parent.css({ height });
    };
  }
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === 'col') {
      $parent.css({ width: finalCoords });
      const $cells = $root.findAll(`[data-key=${$parent.data.innerText}]`);
      $cells.forEach($cellElement => $cellElement.style.width = finalCoords);
    } else {
      $parent.css({ height: finalCoords });
    }
    $resizer.css({ opacity: 0, bottom:0, right:0 });
  };
};