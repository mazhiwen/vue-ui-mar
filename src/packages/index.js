import Menu from './Menu/Menu.vue';
import dropMenu from './Menu/DropMenu/index.js';
import Edit from './Edit/Edit';

import EditorDataController from './Edit/EditorDataController';

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
