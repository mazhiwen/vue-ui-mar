<template>
  <div
    ref="current_menuitem_ref"
    class="m_menuitem_box"
    :class="{
      'm_menuitem_box_rowtype':!isSecondLevel&&!isRootLevel,
      'm_menuitem_box_leftwrap':isLeftWrap
    }"
  >
    <div
      v-for="(value,index) in data"
      :key="index"
      class="m_menu_item"
      :class="{active:value.active}"
      @mouseenter="mouseenter(value,$event,index)"
      @mouseleave="mouseleave(value,$event,index)"
    >
      <div
        class="item_label"
        @click="itemClick(value,getItemIndex(value,`${indexPre}${startIndex+index}`))"
      >
        {{ value.label }}
        <span
          v-if="value.labelExtra"
          class="itemnum"
        >
          ({{ value.labelExtra }})
        </span>
        <template
          v-if="value.children&&value.children.length>0"
        >
          <i
            v-if="isRootLevel"
            class="m_menu_icon el-icon-arrow-down"
            :class="{
              'm_menuicon_up':value.childVisible,
              'm_menuicon_down':!value.childVisible,
            }"
          />
          <i
            v-else
            class="m_menu_icon el-icon-arrow-right"
            :class="{
              'm_menuicon_right':!value.childVisible,
              'm_menuicon_left':value.childVisible,
            }"
          />
        </template>
      </div>
      <transition name="fade">
        <MenuItem
          v-if="
            !isRootLevel
              &&value.children
              &&value.children.length>0
              &&value.childVisible
          "
          :indexPre="`${indexPre}${startIndex+index}-`"
          :data="value.children"
          :isLeftWrap="shouldChildrenLeftWrap"
          :dataController="dataController"
        />
      </transition>
    </div>
  </div>
</template>

<script>

const getItemIndex = function (value, index) {
  return {
    value: value.value ? value.value.toString() : `${index}`,
    index: `${index}`,
  };
};


let movingFromRoot;
export default {
  name: 'MenuItem',
  components: {},
  filters: {
    getItemIndex: getItemIndex,
  },
  // inject: ["onItemClick"],
  props: {
    dataController: Object,
    indexPre: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    isRootLevel: {
      type: Boolean,
      default: false,
    },
    isSecondLevel: {
      type: Boolean,
      default: false,
    },
    // startIndex: [Number]
    startIndex: {
      type: Number,
      default: 0,
    },
    isLeftWrap: {
      type: Boolean,
    },
  },
  data() {
    return {
      shouldChildrenLeftWrap: false,
    };
  },
  computed: {
  },
  watch: {


  },
  created() {},
  mounted() {
  },
  updated() {
  },
  beforeDestroy() {},
  methods: {

    getItemIndex,
    mouseenter(item, event, index) {
      if (this.isRootLevel) {
        const rect = event.target.getBoundingClientRect();
        this.$dropMenu({
          dataController: this.dataController,
          data: item.children,
          left: rect.left,
          top: rect.bottom,
          visible: true,
          indexPre: `${this.startIndex + index}-`,
          dropMenuFixRight: rect.left > (document.body.clientWidth - 200),
          item,
        });
      } else {
        if (this.$refs.current_menuitem_ref) {
          this.shouldChildrenLeftWrap = this.isLeftWrap || this.$refs.current_menuitem_ref.getBoundingClientRect().right > (document.body.clientWidth - 200);
        }
      }
      item.childVisible = true;
    },
    mouseleave(item, event, index) {
      if (this.isRootLevel) {
        const rect = event.target.getBoundingClientRect();
        const { clientX, clientY } = event;
        // 判断是否鼠标滑动到子菜单
        if (clientX > rect.left && clientX < rect.right, clientY >= rect.bottom) {
        } else {
          this.$dropMenu({
            dataController: this.dataController,
            visible: false,
          });
          item.childVisible = false;
        }
      } else {
        item.childVisible = false;
      }
    },
    itemClick(item, { value, index }) {
      item.active = true;
      this.dataController.sendItemClick({
        index,
        item,
        value,
      });
    },
  },
};
</script>
