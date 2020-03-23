<template>
  <div class="example">
    <div class="aa">
      <router-view />
    </div>

    <MarMenu
      :data="[
        {
          label:'22'
        },
        {
          label:'33'
        }
      ]"
    />
  </div>
</template>

<script>
import request from 'request';

// import MarMenu from "./packages/menu/Menu.vue";

export default {
  components: {
    // MarMenu
  },
  data() {
    return {
      msg: 'Hello w2222orld!',
      show: true,
    };
  },

};
</script>

<style lang="less">


</style>
