const { Excel } = require('@/components/excel/Excel');
const { Header } = require('@/components/header/Header');
const { Toolbar } = require('@/components/toolbar/Toolbar');
const { Formula } = require('@/components/formula/Formula');
const { Table } = require('@/components/table/Table');

import('./module');
import('./scss/index.scss');

const excel = new Excel('#app', {
  components: [ Header, Toolbar, Formula, Table ],
});

excel.render();
