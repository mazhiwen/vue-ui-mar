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
        :style="{
          visibility: dataController.mentionData.visible?'visible':'hidden',
          left: `${dataController.mentionData.left}px`,
          top: `${dataController.mentionData.top}px`
        }"
        class="m_edit_mentionWrap"
      >
        <ul>
          <li
            v-for="(value,index) in dataController.mentionData.list"
            :key="index"
            @click="mentionItemClick(value)"
          >
            <span
              v-for="(valueL,indexL) in value.splitText"
              :key="indexL"
              :class="{mentionkeyword:valueL.type == 'key'}"
            >
              {{ valueL.text }}
            </span>
          </li>
        </ul>
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
      </div>
      <div
        class="m_edit_contentwrap"
        @mousedown="onMouseDown($event)"
        @mouseup="onMouseUp($event)"
        @mousemove="onMouseMove($event)"
      >
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
    content: {
      type: String,
      default() {
        return '';
      },
    },
    dataController: {
      type: Object,
      default() {
        return {
        };
      },
    },
    config: {
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
  watch: {
    config: {
      handler(newV) {
        this.dataController.mergeConfig(newV);
      },
      deep: true,
      immediate: true,
    },
    content: {
      handler(newV) {
        this.dataController.insertTxts(newV);
        this.dataController.focusTextarea();
      },
      immediate: true,
    },
  },
  created() {
    this.addGlobalEvent();
    this.textData = this.dataController.textData;
    // const fontTestDom = document.createElement('div');
    // document.body.appendChild();
  },
  mounted() {
    // this.dataController.characterWidth = this.$refs.fonttestNum.getBoundingClientRect().width;
    // this.dataController.CNWidth = this.$refs.fonttestCN.getBoundingClientRect().width;
    // 保存DOM ref引用
    this.dataController.editRef = this.$refs.edit;
    this.dataController.fonttestNumRef = this.$refs.fonttestNum;
    this.dataController.fonttestCNRef = this.$refs.fonttestCN;
    this.dataController.getBoundingData();
    // 光标事件
    this.cursorInterval = setInterval(() => {
      this.cursorVisble = 'hidden';
      setTimeout(() => {
        this.cursorVisble = 'visible';
      }, 700);
    }, 1400);
    // this.dataController.editWrapRect = this.$refs.edit.getBoundingClientRect();
    this.dataController.inputTexareaDom = this.$refs.textarea;
    this.dataController.initFocus();
  },
  beforeDestroy() {
    clearInterval(this.cursorInterval);
  },
  methods: {
    // vue v-show当前组件时，会造成当前组件mounted的时候未能获取到正确的clientrect。需要重新active
    // getBoundingData() {
    //   this.dataController.editWrapRect = this.$refs.edit.getBoundingClientRect();
    //   this.dataController.characterWidth = this.$refs.fonttestNum.getBoundingClientRect().width;
    //   this.dataController.CNWidth = this.$refs.fonttestCN.getBoundingClientRect().width;
    // },
    mentionItemClick(item) {
      //
      console.log(item);
      this.dataController.replaceFocusToMentionWord(item);
    },
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
      console.log('外层onMouseUp', e);
      this.dataController.getBoundingData();
      this.dataController.initFocus();
    },
    stopMouseMove() {
      this.isMousePressing = false;
    },
    // textarea每次输入新的值会触发input事件
    onTextAreaChange(e) {
      console.log('onTextAreaChange', e.data);
      if (e.data != null) {
        this.dataController.editText({
          newTxt: e.data,
          isAddTxt: true,
        });
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
        // console.log(e);
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
          this.dataController.onDelete();
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
          this.dataController.addTxts('  ');
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
