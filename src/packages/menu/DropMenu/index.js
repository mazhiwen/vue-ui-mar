import DropMenu from "./DropMenu.vue";
import Menu from "../Menu.vue";

import Vue from "vue";

let DropMenuConstructor = Vue.extend(DropMenu);
let DropMenuInstance = null;

let initDom = (params)=>{
  DropMenuInstance = new DropMenuConstructor({
    el: document.createElement("div"),
    propsData: {
      ...params
    }
  });
  document.body.appendChild( DropMenuInstance.$el);
};


const activeDropMenu = (params)=>{
  if(!DropMenuInstance){
    initDom(params);
  }
  for(let key in params){
    DropMenuInstance.$props[key] = params[key];
  }
  if(typeof(params.visible) == "boolean"){
    DropMenuInstance.$props["visible"] = params.visible;
  }
};

const DropMenuPlugin = {
  install(Vue){
    Vue.component(Menu.name, Menu);

    // Vue.component(activeDropMenu.name,activeDropMenu);
    Vue.prototype.$dropMenu = activeDropMenu;
  }
};

export default DropMenuPlugin;



