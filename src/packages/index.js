import Menu from './menu/Menu.vue';
import dropMenu from './menu/DropMenu/index.js';
import Edit from './edit/Edit';

import EditorDataController from './edit/EditorDataController';

const components = [
  Menu,
  Edit,
];


const install = function (Vue, opts = {}) {
  console.log('执行install');
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$dropMenu = dropMenu;
  Vue.prototype.$EditorDataController = EditorDataController;
};


// window挂载vue时 安装插件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: 'fk',
  install,
  // EditorDataController,
};
