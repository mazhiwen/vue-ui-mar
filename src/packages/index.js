import Menu from './menu/Menu.vue';
import dropMenu from './menu/DropMenu/index.js';


const components = [
  Menu
]


const install = function (Vue, opts = {}) {
  
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$dropMenu = dropMenu;
  

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}