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
    <MarEdit
      :data-controller="ruleDataController"
    />
  </div>
</template>

<script>
import request from 'request';


export default {
  components: {
    // MarMenu
  },
  data() {
    return {
      msg: 'Hello w2222orld!',
      show: true,
      ruleDataController: new this.$EditorDataController.DataController({
      }),
    };
  },
  beforeCreate() {
    // this.ruleDataController =
  },
};
</script>

<style lang="less">


</style>
