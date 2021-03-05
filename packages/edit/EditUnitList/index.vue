<template>
  <div
    class="rowtext_wrap"
    @mousedown="onRowMouseDown($event)"
    @mouseup="onRowMouseUp($event)"
  >
    <pre
      ref="rowDomRef"
    ><span
      v-for="(value,index) in data"
      :key="index"
      class="unitItem"
      :class="getItemClass(value)"
      @dragstart="onDragStart(value)"
      @dragover="onDragover($event,value,index)"
      @drop="onDrop($event)"
      @mousedown="onUnitMouseDown($event,value, index)"
      @mouseup="onUnitMouseUp($event,value, index)"
      @mousemove="onUnitMouseOver($event,value, index)"
    >{{ value.text }}</span></pre>
  </div>
</template>

<script>
// import config from '../config';


/** item 值obj
 * 这一行是旧数据
 * { id: 1, data: '+', name: '+', code: '+',
      以下是新数据
      text: '',
      type: 'operator',
    }
 */
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    rowIndex: {
      type: Number,
      default() {
        return 0;
      },
    },
    dataController: {
      type: Object,
      default() {
        return {
        };
      },
    },
  },
  data() {
    return {
      isMousePressing: false,
      mouseEventData: {
        clientX: null,
        clientY: null,
      },
    };
  },
  computed: {
    // data: function () {
    //   return this.dataController.editUnitListData;
    // },
  },
  mounted() {
    this.dataController.rowDomRefs[this.rowIndex] = this.$refs.rowDomRef;
  },
  methods: {
    onRowMouseDown(e) {
      e.stopPropagation();
      this.dataController.onRowMouseDown(
        e,
        this.rowIndex,
      );
    },
    onRowMouseUp(e) {
      e.stopPropagation();
      this.dataController.getBoundingData();
      this.dataController.onRowMouseUp(e, this.rowIndex);
    },
    onUnitMouseDown(e, data, focusUnitIndexInRow) {
      e.stopPropagation();
      this.dataController.onUnitMouseDown(
        focusUnitIndexInRow,
        this.rowIndex,
        e.target.getBoundingClientRect(),
        e,
      );
    },
    onUnitMouseOver(e, data, focusUnitIndexInRow) {
      e.stopPropagation();
      this.dataController.onUnitMouseOver(
        focusUnitIndexInRow,
        this.rowIndex,
        e.target.getBoundingClientRect(),
        e,
      );
    },
    onUnitMouseUp(e, data, focusUnitIndexInRow) {
      e.stopPropagation();
      this.dataController.getBoundingData();
      this.dataController.onUnitMouseUp(
        focusUnitIndexInRow,
        this.rowIndex,
        e.target.getBoundingClientRect(),
        e,
      );
    },
    getItemClass(value) {
      const res = {
        item_dragging: value.isDragging,
      };
      res[`item_${value.type}`] = true;
      return res;
    },
    onDragStart() {
      console.log(this.dataController);
    },
    onDragover(e, data, index) {
      console.log('子级Dragover', data.code);
      e.preventDefault();
      e.stopPropagation();
      const rect = e.target.getBoundingClientRect();
      console.log();
      if (e.clientX > (rect.left + (rect.width) / 2)) {
        // 在元素右侧
        // 判断不是新drag的补充的最后一个元素
        if (this.dataController.originDataLength !== index) {
          this.dataController.insertCurrentDraggingToList(index + 1);
        }
      } else {
        // 在元素左侧
        this.dataController.insertCurrentDraggingToList(index);
      }
    },
    onDrop(e) {
      console.log('子级Drop');
      e.preventDefault();
      e.stopPropagation();
      this.dataController.clearCurrentDragData();
    },

  },
};
</script>

<style >

</style>
