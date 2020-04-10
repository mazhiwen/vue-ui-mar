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
// import MARUI from 'vue-ui-mar';
import store from './store';


import App from './App.vue';
import MARUI from './packages';

console.log(MARUI);

Vue.use(MARUI);
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