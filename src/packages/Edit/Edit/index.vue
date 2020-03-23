<template>
  <div
    class="m_edit"
  >
    <ul
      class="rownum_wrap"
    >
      <li
        v-for="(value,index) in dataController.lineNumList"
        :key="index"
      >
        {{ index + 1 }}
      </li>
    </ul>
    <div
      ref="edit"
      class="m_edit_wrap"
      @dragover="onEditAreaDragover($event)"
      @drop="onEditAreaDrop($event)"
      @mousedown="onMouseDown($event)"
      @mouseup="onMouseUp($event)"
      @mousemove="onMouseMove($event)"
    >
      <div
        class="edit_fonttest"
      >
        <pre><span ref="fonttestNum">1</span></pre>
        <pre><span ref="fonttestCN">一</span></pre>
      </div>
      <div
        :style="{
          visibility: cursorVisble,
          left: `${dataController.cursorData.left}px`,
          top: `${dataController.cursorData.top}px`
        }"
        class="m_edit_cursorwrap"
      >
        <div />
      </div>
      <div
        class="e_edit_textareawrap"
        :style="{
          left: `${dataController.cursorData.left}px`,
          top: `${dataController.cursorData.top}px`
        }"
      >
        <textarea
          ref="textarea"
          @input="onTextAreaChange($event)"
          @paste="onTextareaPaste($event)"
        />
      </div>
      <div
        class="e_edit_selectwrap"
      >
        <div
          v-for="(value,index) in dataController.selectArea"
          :key="index"
          class="m_selectline"
          :style="{
            left: `${value.left}px`,
            top: `${value.top}px`,
            width: `${value.width}px`
          }"
        />
        <!-- <div
          class="m_select_firstline"
          :style="{
            left: `${dataController.selectFirstLine.left}px`,
            top: `${dataController.selectFirstLine.top}px`,
            width: `${dataController.selectFirstLine.width}px`
          }"
        />
        <div
          class="m_select_middleline"
          :style="{
            left: `${dataController.selectMiddleLine.left}px`,
            top: `${dataController.selectMiddleLine.top}px`,
            width: `${dataController.selectMiddleLine.width}px`
          }"
        />
        <div
          class="m_select_lastline"
          :style="{
            left: `${dataController.selectLastLine.left}px`,
            top: `${dataController.selectLastLine.top}px`,
            width: `${dataController.selectLastLine.width}px`
          }"
        /> -->
      </div>
      <div>
        <div
          v-for="(value,index) in textData"
          :key="index"
          class="edit_rowwrap"
        >
          <EditUnitList
            :data="value"
            :data-controller="dataController"
            :row-index="index"
            @stopMouseMove="stopMouseMove"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import config from '../config';
import EditUnitList from '../EditUnitList';

export default {
  name: 'MarEdit',
  components: {
    EditUnitList,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
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
      textData: [],
      cursorVisble: 'visible',
      cursorInterval: null,
      isMousePressing: false,
      mouseEventData: {
        clientX: null,
        clientY: null,
      },
    };
  },
  computed: {
  },
  created() {
    this.addGlobalEvent();
    this.textData = this.dataController.textData;
  },
  mounted() {
    this.dataController.characterWidth = this.$refs.fonttestNum.getBoundingClientRect().width;
    this.dataController.CNWidth = this.$refs.fonttestCN.getBoundingClientRect().width;
    this.cursorInterval = setInterval(() => {
      this.cursorVisble = 'hidden';
      setTimeout(() => {
        this.cursorVisble = 'visible';
      }, 700);
    }, 1400);
    this.dataController.editWrapRect = this.$refs.edit.getBoundingClientRect();
    this.dataController.inputTexareaDom = this.$refs.textarea;
  },
  beforeDestroy() {
    clearInterval(this.cursorInterval);
  },
  methods: {
    onTextareaPaste(e) { // 粘贴
      e.preventDefault();
      const pasteTxt = (e.clipboardData || window.clipboardData).getData('text');
      console.log('onTextareaPaste', pasteTxt);

      this.dataController.paste(pasteTxt);
    },
    onMouseDown(e) {
      console.log('onMouseDown', e);
    },
    onMouseMove(e) {
      const eClientX = e.clientX;
      const eClientY = e.clientY;
      const oClientX = this.mouseEventData.clientX;
      const oClientY = this.mouseEventData.clientY;
      if (this.isMousePressing && (eClientX !== oClientX || eClientY !== oClientY)) {
        console.log('onMouseMove');
      }
    },
    onMouseUp(e) {
      console.log('onMouseUp', e);
      this.dataController.initFocus();
    },
    stopMouseMove() {
      this.isMousePressing = false;
    },
    // textarea每次输入新的值会触发input事件
    onTextAreaChange(e) {
      console.log('onTextAreaChange', e);
      if (e.data != null) {
        this.dataController.onIputNewTxt(e.data);
      }
    },
    addGlobalEvent() {
      // 全局增加drop事件
      document.addEventListener('dragover', (e) => {
        e.preventDefault();
        console.log('document dragover');
      }, false);
      document.addEventListener('drop', (e) => {
        e.preventDefault();
        console.log('document drop');
        console.log(this.dataController.temporaryInsertIndex);
        this.dataController.cancelDrag();
      }, false);
      document.addEventListener('copy', (e) => {
        e.preventDefault();
        this.dataController.copy(e);
      });
      document.addEventListener('keydown', (e) => {
        console.log(e);
        const {
          keyCode, altKey, ctrlKey, metaKey, shiftKey,
        } = e;
        if (ctrlKey) {
          if (keyCode === 67) { // 复制
            // this.dataController.copy();
            // e.clipboardData.setData('text/plain', 'fuckyou');
          } else if (keyCode === 86) { // 粘贴

          }
        } else if (keyCode === 8) { // 删除
          this.dataController.deleteCharacter();
        } else if (keyCode === 13) { // 回车键
          this.dataController.onEnterClick();
        } else if (keyCode === 37) { // 左
          this.dataController.cursorMoveLeft();
        } else if (keyCode === 38) { // 上
          this.dataController.cursorMoveUp();
        } else if (keyCode === 39) { // 右
          this.dataController.cursorMoveRight();
        } else if (keyCode === 40) { // 下
          this.dataController.cursorMoveDown();
        } else if (keyCode === 9) { // tab键
          e.preventDefault();
          this.dataController.addTxts({
            newTxt: '  ',
          });
        }

        // 判断键盘按键为有效输入字符
        // if (
        //   !(altKey || ctrlKey || metaKey || shiftKey)
        //   && (
        //     (keyCode >= 48 && keyCode <= 111)
        //     || (keyCode >= 187 && keyCode <= 192)
        //     || (keyCode >= 219 && keyCode <= 222)
        //   )
        // ) {
        //   this.dataController.appendDataToList({
        //     text: `${e.key}`,
        //   });
        //   this.dataController.cursorData.left += 7;
        // }
      });
    },
    onEditAreaDragover(e) {
      // console.log('父级Dragover');
      e.preventDefault();
      e.stopPropagation();
      this.dataController.insertCurrentDraggingToList(this.dataController.originDataLength);
    },
    onEditAreaDrop(e) {
      console.log('父级Drop');
      e.preventDefault();
      e.stopPropagation();
      this.dataController.clearCurrentDragData();
    },
  },
};
</script>

<style >

</style>
