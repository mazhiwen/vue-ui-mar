<template>
  <transition
    name="fade"
  >
  <div
    v-if="visible"
    class="m_menu_dropwrap"
    :style="{
      left:dropMenuFixRight?'unset':`${left}px`,
      top:`${top}px`,
      right:dropMenuFixRight?'200px':'unset'
    }"
    @mouseleave="dropMenuMouseleave($event)"
  >
    <MenuItem
      :data="data"
      :indexPre="indexPre"
      :isSecondLevel="true"
      :dataController="dataController"
    />
  </div>
  </transition>
</template>

<script>
import MenuItem from "../MenuItem.vue";

export default {
  props: {
    dataController: Object,
    visible:{
      type: Boolean,
      default: false
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    indexPre: {
      type: String,
      default: ""
    },
    dropMenuFixRight: {
      type: Boolean,
      default: false
    },
    item:{
      type: Object,
      default: function(){
        return {};
      }
    }
  },
  components: {
    MenuItem
  },
  mounted(){

  },
  updated(){
  },
  methods:{
    dropMenuMouseleave(event){
      let rect = event.target.getBoundingClientRect();
      const { clientX , clientY } = event;
      // 判断是否鼠标滑动到子菜单
      if(clientX > rect.left && clientX < rect.right, clientY <= rect.top){
      }else{
        this.$dropMenu({
          visible: false
        });
        this.item.childVisible = false;
      }
    }
  }
};
</script>


