import Menu from './menu/Menu.vue';
import dropMenu from './menu/DropMenu/index.js';


const components = [
  Menu,
];


const install = function (Vue, opts = {}) {
  console.log('执行install');
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$dropMenu = dropMenu;
};


// window挂载vue时 安装插件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: 'fk',
  install,
};
