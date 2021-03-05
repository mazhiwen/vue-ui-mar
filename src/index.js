import _ from 'lodash';
import {
  utiDate,
} from 'utility-mar';
import 'styles';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  routes,
} from 'router';
import store from './store';


import App from './App.vue';

import {menu} from 'vue-ui-mar';
// import MARUI from 'packages';
// import 'packages/menu/styles';
require('vue-ui-mar/lib/common');

var aaa = require('vue-ui-mar/lib/menu');

console.log(aaa);

// Vue.use(MARUI);
Vue.use(VueRouter);
// Vue.use(DropMenuPlugin);


const router = new VueRouter({
  mode: 'history',
  routes, // (缩写) 相当于 routes: routes
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
