// import Vue from './node_modules/vue';
import Vue from 'vue';

import DropMenu from './DropMenu.vue';
import Menu from '../Menu.vue';


const DropMenuConstructor = Vue.extend(DropMenu);
let DropMenuInstance = null;

const initDom = (params) => {
  DropMenuInstance = new DropMenuConstructor({
    el: document.createElement('div'),
    propsData: {
      ...params,
    },
  });
  document.body.appendChild(DropMenuInstance.$el);
};


const activeDropMenu = (params) => {
  if (!DropMenuInstance) {
    initDom(params);
  }
  for (const key in params) {
    DropMenuInstance.$props[key] = params[key];
  }
  if (typeof (params.visible) === 'boolean') {
    DropMenuInstance.$props.visible = params.visible;
  }
};

const DropMenuPlugin = {
  install(Vue) {
    Vue.component(Menu.name, Menu);
    Vue.prototype.$dropMenu = activeDropMenu;
  },
};

// export default DropMenuPlugin;
export default activeDropMenu;
