import {
  copy,
  util,
} from 'utility-mar';
import loki from 'lokijs';
import {
  wordTypesList,
} from './config';

const db = new loki('Example');


let keywordsCollection = null;

const setConfigToMentionData = function (wordTypesListV) {
  const keywordsList = [];
  wordTypesListV.forEach((value, index) => {
    value.words.forEach((valueW, indexW) => {
      keywordsList.push({
        text: valueW,
      });
    });
  });
  db.removeCollection('keywords');
  keywordsCollection = db.addCollection('keywords');
  keywordsCollection.insert(keywordsList);
};

setConfigToMentionData(wordTypesList);
// const dv = keywords.addDynamicView('a_complex_view');
// dv.applyWhere(obj => obj.name.length < 5 && obj.age > 30);
// console.log(dv.data());


// parseStrToUnitArr 在addtxts的某些引用方法错误
// 翻页
// 需要做粘贴后 focus
// 粘贴头尾分别是末端的时候
// 换行功能
// 完成focusbyindex方法
// 简化单位变量
// 根据domref 取unitrect 的方法抽离
// 删除功能，本行删完，上一行是空时
// 整理this引用
// 补充分割符号判断
// 增加中文判断
// 双击选中
// 需要做粘贴时候 首末行无数据时处理
// 需要优化v-show 的时候 会取不到bounding data
const DataController = function ({
  parama,
}) {
  // 当前拖动的元item数据
  this.currentDraggingData = null;
  // 实际操作并展示的数据元的集合
  this.editUnitListData = [];
  this.textData = [];
  // 行索引
  this.focusRowIndex = 0;
  // 拖动状态下 当前暂时插入的 偏移位 unit index in unitlist
  this.temporaryInsertIndex = null;
  // 源数据的长度
  this.originDataLength = 0;
  this.unitInRowLengthList = [];
  this.cursorData = {
    left: -10,
    top: 0,
  };
  this.editWrapRect = {};
  this.inputTexareaDom = null;
  // 编辑框ref
  this.editRef = null;
  // 数字测试ref
  this.fonttestNumRef = null;
  // 中文测试ref
  this.fonttestCNRef = null;
  // 行dom元素
  this.rowDomRef = null;
  this.rowDomRefs = [];
  // 当前focus的unit index
  this.focusUnitIndexInRow = -1;
  // 当前focues的 unit中的字符串的index位置
  this.focusChaIndexInUnit = null;
  // 行数值列表
  this.lineNumList = [1];
  // ///////////////// 临时加的，后期删掉
  this.isMouseMoving = false;
  // 鼠标按下时的选中client数据 以及 rowindex
  this.startMoveData = {
    cursorLeft: null,
    cursorTop: null,
    focusRowIndex: null,
    focusUnitIndexInRow: null,
    focusChaIndexInUnit: null,
    clientX: null,
    clientY: null,
  };
  // 鼠标是否选中拖拉移动
  this.isMouseSelectMoving = null;
  this.characterWidth = null;
  this.CNWidth = null;
  // 按上下键时，标记的起始触发按键的 行中focus unit的索引位置.
  this.arrowKeyStartFocusUnitIndexInRow = null;
  this.arrowKeyStartCompareLeft = null;
  // 鼠标按下选中区域
  this.selectArea = [];
  // 粘贴板的文本数据 行
  this.copyRowData = [];
  // 编辑框左侧padding
  this.editLetPadding = 4;
  // 行高度
  this.lineHeight = 25;
  // 提示框数据
  this.mentionData = {
    visible: false,
    left: 0,
    top: 0,
    // 提示框列表数据
    list: [

    ],
  };
  // 是否初始化 取过正确的 bounding data
  this.hasInit = false;
  this.wordTypesList = copy.deepCopy(wordTypesList);
};


DataController.prototype.mergeConfig = function ({
  wordType,
}) {
  const wordTypesListT = copy.deepCopy(wordTypesList);
  if (wordType) {
    const wordTypeKeyList = Object.keys(wordType);
    wordTypesListT.forEach((value, index) => {
      if (wordTypeKeyList.includes(value.type)) {
        value.words = util.unionArray(value.words, wordType[value.type]);
      }
    });
  }
  this.wordTypesList = wordTypesListT;
  setConfigToMentionData(wordTypesListT);
};

// 根据dom ref引用 获取对应的bounding data:
DataController.prototype.getBoundingData = function () {
  this.editWrapRect = this.editRef.getBoundingClientRect();
  this.characterWidth = this.fonttestNumRef.getBoundingClientRect().width;
  this.CNWidth = this.fonttestCNRef.getBoundingClientRect().width;
};


// 拖动相关:
DataController.prototype.setOnDraggingData = function (data) {
  this.currentDraggingData = {
    ...data,
    isDragging: true,
  };
};

// 拖动相关: 添加当前拖动数据到行末尾
DataController.prototype.appendCurrentToList = function () {
  this.appendDataToList(this.currentDraggingData);
};

// 添加字符数据到行末尾
DataController.prototype.appendDataToList = function (data) {
  const index = this.editUnitListData.length;
  this.focusUnitIndexInRow = index;
  this.spliceUnitToList({
    spliceParams: [this.focusUnitIndexInRow, 0, data],
    isAddTxt: true,
  });
  console.log(this.editUnitListData);
};

// 拖动相关:  插入当前拖动数据字符数据到行
DataController.prototype.insertCurrentDraggingToList = function (index) {
  console.log('insertCurrentDraggingToList', index, this.temporaryInsertIndex);
  if (index === this.temporaryInsertIndex) return;
  if (this.temporaryInsertIndex !== null) {
    this.editUnitListData.splice(this.temporaryInsertIndex, 1);
  }
  // 这里操作 currentDraggingData 需要深拷贝一次
  this.spliceUnitToList({
    spliceParams: [index, 0, this.currentDraggingData],
  });
  this.temporaryInsertIndex = index;
};

// 插入字符数据到行数据 数值操作,并且更新光标位置
DataController.prototype.spliceUnitToList = function ({
  spliceParams,
  isGoToLastUnit,
  isAddTxt,
  data,
  isAddNewUnit,
  newTxt,
}) {
  this.editUnitListData.splice(...spliceParams);
  const focusUnitIndexInRow = spliceParams[0];
  // const currentUnitData = spliceParams[2];
  // 操作光标
  // 如果是删除元素，当前unitindex -1；
  if (isGoToLastUnit) {
    // focusUnitIndexInRow -= 1;
    if (this.focusUnitIndexInRow >= 1) {
      this.focusUnitIndexInRow -= 1;
      // this.focusChaIndexInUnit = this.editUnitListData[this.focusUnitIndexInRow].length;
    } else {
      this.focusUnitIndexInRow = -1;
    }
  }
  const currentUnitData = this.editUnitListData[focusUnitIndexInRow];
  // 研究一下 vue 设置this.data，刷新dom后，执行settimeout 0 的事件
  setTimeout(() => {
    console.log(focusUnitIndexInRow);
    // 研究一下，可能是字体原因，pre字体还没渲染的时候一个字符宽度是9，所以此时拿到的offsetWidth是9, 1000ms后才是7;
    const unitDom = this.rowDomRef.childNodes.item(focusUnitIndexInRow);
    console.dir(unitDom);
    console.log(unitDom.offsetLeft);
    // 计算text文本宽度 计算光标偏移left
    let textWidth = 0;
    currentUnitData.text.split('').forEach((value) => {
      textWidth += this.getCharacterWidth(value);
    });
    this.cursorData.left = unitDom.offsetLeft + textWidth;
    console.log('spliceUnitToList', this.focusUnitIndexInRow, this.focusChaIndexInUnit, this.editUnitListData);
  }, 0);
};


DataController.prototype.resetArrowKeyStartIndex = function () {
  this.arrowKeyStartFocusUnitIndexInRow = null;
};

// 插入字符数据到行数据 数值操作,并且更新光标位置
DataController.prototype.editText = function ({
  isAddTxt,
  newTxt,
}) {
  this.resetArrowKeyStartIndex();
  setTimeout(() => {
    // 添加
    if (isAddTxt) {
      this.insertTxts(newTxt);
    } else {
      // 删除
      this.deleteTxt();
    }
  }, 0);
};


DataController.prototype.updateCharacterLengthData = function (spliceParams) {
  this.unitInRowLengthList.splice(...[spliceParams[0], spliceParams[1], spliceParams[2]
    .text.length]);
  // data.text.split('').forEach((value, indexr) => {
  //   console.log(value);
  // });
  console.log(this.unitInRowLengthList);
};

DataController.prototype.initTemporaryInsertIndex = function () {
  this.temporaryInsertIndex = null;
};

DataController.prototype.clearCurrentDragData = function () {
  console.log('执行 clearCurrentDragData', this.editUnitListData);
  // this.initTemporaryInsertIndex();

  if (this.editUnitListData[this.temporaryInsertIndex]) {
    this.editUnitListData[this.temporaryInsertIndex].isDragging = false;
  }
  this.temporaryInsertIndex = null;
  this.originDataLength = this.editUnitListData.length;
};

DataController.prototype.cancelDrag = function () {
  console.log('执行 cancelDrag', this.editUnitListData);
  console.log(this.temporaryInsertIndex);
  if (this.temporaryInsertIndex === null) return;
  this.editUnitListData.splice(this.temporaryInsertIndex, 1);
  this.clearCurrentDragData();
};

// 设置鼠标开始移动时的 数据
DataController.prototype.setStartMoveData = function () {
  // console.log('setStartMoveData', this.focusUnitIndexInRow, this.focusChaIndexInUnit);
  this.startMoveData.cursorLeft = this.cursorData.left;
  this.startMoveData.cursorTop = this.cursorData.top;
  this.startMoveData.focusUnitIndexInRow = this.focusUnitIndexInRow;
  this.startMoveData.focusChaIndexInUnit = this.focusChaIndexInUnit;
};

// 选中移动相关, 设置鼠标在移动之前的位置
DataController.prototype.setStartMouseDownPosition = function (e, focusRowIndex) {
  this.startMoveData.clientX = e.clientX;
  this.startMoveData.clientY = e.clientY;
  this.startMoveData.focusRowIndex = focusRowIndex;
  this.isMouseSelectMoving = true;
};

DataController.prototype.clearStartMouseDownPosition = function () {
  this.isMouseSelectMoving = false;
};


// 聚焦行末尾
DataController.prototype.focusEndRow = function (index) {
  // console.log('focusEndRow');
  const unitDom = this.rowDomRefs[index].lastChild;
  this.cursorData.top = this.lineHeight * index;
  this.focusRowIndex = index;
  if (unitDom) { // 如果这一行有数据
    const left = unitDom.offsetLeft + unitDom.offsetWidth;
    this.cursorData.left = left;
    this.focusUnitIndexInRow = this.textData[index].length - 1;
    this.focusChaIndexInUnit = this.textData[index][this.focusUnitIndexInRow].text.length - 1;
  } else { // 如果这一行没有数据
    this.cursorData.left = this.editLetPadding;
    this.focusUnitIndexInRow = -1;
    this.focusChaIndexInUnit = -1;
  }
  this.setStartMoveData();
};


DataController.prototype.initSelectLine = function () {
  this.selectArea = [];
};

DataController.prototype.focusHead = function () {
  this.cursorData = {
    left: this.editLetPadding,
    top: 0,
  };
};

DataController.prototype.initFocus = function () {
  if (this.textData.length > 0) {
    this.focusEndRow(this.textData.length - 1);
  } else {
    this.focusHead();
  }
  this.focusTextarea();
};


DataController.prototype.focusTextarea = function () {
  this.inputTexareaDom && this.inputTexareaDom.focus();
};

// 根据屏幕点 定焦文字单元
DataController.prototype.focusUnit = function ({
  focusUnitIndexInRow,
  focusRowIndex,
  unitRect,
  compareParameter,
  isFocus,
}) {
  let {
    left,
  } = unitRect;
  let focusChaIndexInUnit = null;
  this.focusRowIndex = focusRowIndex;
  const unitData = this.textData[focusRowIndex][focusUnitIndexInRow];
  // console.log('focusUnit', focusUnitIndexInRow, compareParameter);
  unitData.text.split('').every((value, index) => {
    // 位置在当前字符偏左
    // console.log('遍历', value, '索引', index);
    const currentCharacterWidth = this.getCharacterWidth(value);
    if (compareParameter <= left + currentCharacterWidth / 2) {
      if (index === 0) { // 在unit第一个字符偏左，实际应该focus到上一个unit最后一个字符
        focusUnitIndexInRow -= 1;
        if (focusUnitIndexInRow >= 0) {
          focusChaIndexInUnit = this.textData[focusRowIndex][focusUnitIndexInRow].text.length - 1;
        }
      } else {
        focusChaIndexInUnit = index - 1;
      }
      this.cursorData.top = focusRowIndex * this.lineHeight;
      this.cursorData.left = left - this.editWrapRect.left;
      return false;
    }
    // 位置在当前字符偏右
    if (compareParameter <= left + currentCharacterWidth) {
      left += currentCharacterWidth;
      focusChaIndexInUnit = index;
      this.cursorData.top = focusRowIndex * this.lineHeight;
      this.cursorData.left = left - this.editWrapRect.left;
      return false;
    }
    left += currentCharacterWidth;
    return true;
  });
  this.focusUnitIndexInRow = focusUnitIndexInRow;
  this.focusChaIndexInUnit = focusChaIndexInUnit;
  if (isFocus) {
    this.setStartMoveData();
    this.initSelectLine();
  }
};

// 获取某个unit 的 rect
DataController.prototype.getUnitRect = function (focusRowIndex, focusUnitIndexInRow) {
  const rowChildNodes = this.rowDomRefs[focusRowIndex].childNodes;
  return rowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
};

// 根据字符index 定焦光标文字单元
DataController.prototype.focusUnitByIndex = function (
  focusRowIndex,
  focusUnitIndexInRow,
  focusChaIndexInUnit,
) {
  console.log('focusUnitByIndex', focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit);
  if (focusUnitIndexInRow === -1) {
    this.cursorData.left = this.editLetPadding;
  } else {
    let {
      left,
    } = this.getUnitRect(focusRowIndex, focusUnitIndexInRow);
    const unitData = this.textData[focusRowIndex][focusUnitIndexInRow];
    unitData.text.split('').every((value, index) => {
      if (index > focusChaIndexInUnit) {
        return false;
      }
      left += this.getCharacterWidth(value);
      this.cursorData.left = left - this.editWrapRect.left;
      return true;
    });
  }
  this.cursorData.top = focusRowIndex * this.lineHeight;
};

// 通过鼠标移动坐标点 判断鼠标是否正在进行选中移动 或者 是点击
DataController.prototype.getIsMouseMoving = function (e) {
  if (this.isMouseSelectMoving) {
    const eClientX = e.clientX;
    const eClientY = e.clientY;
    const oClientX = this.startMoveData.clientX;
    const oClientY = this.startMoveData.clientY;
    this.isMouseMoving = oClientX && (eClientX !== oClientX || eClientY !== oClientY);
    return this.isMouseMoving;
  }
  return false;
};

DataController.prototype.onUnitMouseDown = function (
  focusUnitIndexInRow,
  focusRowIndex,
  unitRect,
  e,
) {
  // console.log('onUnitMouseDown');
  this.setStartMouseDownPosition(e, focusRowIndex);
  this.focusUnit({
    focusUnitIndexInRow,
    focusRowIndex,
    unitRect,
    compareParameter: e.clientX,
    isFocus: true,
  });
};

// 鼠标移过unit单元
DataController.prototype.onUnitMouseOver = function (
  focusUnitIndexInRow,
  focusRowIndex,
  unitRect,
  e,
) {
  // console.log('onUnitMouseOver');
  if (this.getIsMouseMoving(e)) {
    // 移动中聚焦光标到移动到的unit
    this.focusUnit({
      focusUnitIndexInRow,
      focusRowIndex,
      unitRect,
      compareParameter: e.clientX,
      isFocus: false,
    });
    const startRowIndex = this.startMoveData.focusRowIndex;
    const rowClientRect = this.rowDomRefs[startRowIndex].getBoundingClientRect();
    let selectArea = [];
    // 获取某一行的最后一个unit的 clientrect
    const getLastUnitRectInRow = (rowIndex) => {
      const lastRowChildNodes = this.rowDomRefs[rowIndex].childNodes;
      return lastRowChildNodes[lastRowChildNodes.length - 1].getBoundingClientRect();
    };
    // 计算中间选中行的覆盖层
    const setCenterSelectData = (highIndex, lowIndex) => {
      const disRow = highIndex - lowIndex;
      if (disRow > 1) {
        let countRowIndex = lowIndex + 1;
        while (countRowIndex < highIndex) {
          selectArea.push({
            left: 0,
            width: this.rowDomRefs[countRowIndex].lastChild.getBoundingClientRect().right - this.editWrapRect.left,
            top: countRowIndex * this.lineHeight,
          });
          countRowIndex += 1;
        }
      }
    };
    const startCursorLeft = this.startMoveData.cursorLeft;
    if (e.clientY <= rowClientRect.top) { // 向上选中
      const lastUnitRect = getLastUnitRectInRow(focusRowIndex);
      // 开始选中行
      selectArea.push({
        left: 0,
        width: startCursorLeft,
        top: startRowIndex * this.lineHeight,
      });
      // 结尾选中行 首行鼠标浮过的一行 选中区域
      selectArea.push({
        left: this.cursorData.left,
        width: lastUnitRect.right - this.editWrapRect.left - this.cursorData.left,
        top: focusRowIndex * this.lineHeight,
      });
      // 中间默认选中全行的区域
      setCenterSelectData(startRowIndex, focusRowIndex);
    } else if (e.clientY > rowClientRect.bottom) { // 向下选中
      // 开始选中行
      const lastUnitRect = getLastUnitRectInRow(startRowIndex);
      selectArea.push({
        left: startCursorLeft,
        width: lastUnitRect.right - this.editWrapRect.left - startCursorLeft,
        top: startRowIndex * this.lineHeight,
      });
      // 结尾选中行 首行鼠标浮过的一行 选中区域
      selectArea.push({
        left: 0,
        width: this.cursorData.left,
        top: focusRowIndex * this.lineHeight,
      });
      // 中间默认选中全行的区域
      setCenterSelectData(focusRowIndex, startRowIndex);
    } else if (e.clientX < startCursorLeft + this.editWrapRect.left) { // 鼠标在当前行左侧移动
      selectArea = [{
        left: this.cursorData.left,
        width: startCursorLeft - this.cursorData.left,
        top: this.startMoveData.cursorTop,
      }];
    } else { // 鼠标在当前行右侧移动
      selectArea = [{
        left: startCursorLeft,
        width: this.cursorData.left - startCursorLeft,
        top: startRowIndex * this.lineHeight,
      }];
    }
    this.selectArea = selectArea;
  }
};


DataController.prototype.onUnitMouseUp = function (
  focusUnitIndexInRow,
  focusRowIndex,
  unitRect,
  e,
) {
  console.log('onUnitMouseUp');
  this.clearStartMouseDownPosition();
  this.focusTextarea();
  // this.initSelectLine();
};


DataController.prototype.onRowMouseDown = function (
  e,
  focusRowIndex,
) {
  // console.log('RowMouseDown');
  this.setStartMouseDownPosition(e, focusRowIndex);
  this.initSelectLine();
  if (this.cursorData.left < 0) { // 页面初始化无聚焦
    this.focusHead();
  } else { // 已经有旧的聚焦
    this.focusEndRow(focusRowIndex);
  }
};


DataController.prototype.onRowMouseUp = function (e, rowIndex) {
  // console.log('onRowMouseUp');
  this.clearStartMouseDownPosition();
  this.focusTextarea();
};

// 获取单个字符单元的类型
DataController.prototype.getUnitType = function (txt) {
  if (/^\d+$/.test(txt)) {
    return 'number';
  }
  if (/^\S+$/.test(txt)) {
    let type = null;
    this.wordTypesList.forEach((value, index) => {
      if (value.words.includes(txt)) {
        ({
          type,
        } = value);
      }
    });
    if (type === null) {
      return 'main';
    }
    return type;
  }
  if (/^[ |\t]+$/.test(txt)) {
    return 'space';
  }
  if (/^[\r|\n]$/.test(txt)) {
    return 'breakline';
  }
  return null;
};


DataController.prototype.deleteTxt = function () {
  const rowData = this.textData[this.focusRowIndex];
  // console.log('deleteTxt前', this.focusUnitIndexInRow, this.focusChaIndexInUnit);
  // 光标到达行开头
  const data = copy.deepCopy(rowData[this.focusUnitIndexInRow]);
  this.cursorData.left -= this.getCharacterWidth(data.text[this.focusChaIndexInUnit]);
  const arr = data.text.split('');
  const replaceUnit = () => {
    arr.splice(this.focusChaIndexInUnit, 1);
    const newText = arr.join('');
    data.text = newText;
    data.type = this.getUnitType(newText);
    rowData.splice(this.focusUnitIndexInRow, 1, data);
    return newText;
  };
  const reduceCount = () => {
    this.focusUnitIndexInRow -= 1;
    this.focusChaIndexInUnit = rowData[this.focusUnitIndexInRow]
      .text.length - 1;
  };
  if (this.focusChaIndexInUnit === 0) {
    if (this.focusUnitIndexInRow === 0) {
      if (arr.length === 1) {
        rowData.splice(this.focusUnitIndexInRow, 1);
      } else {
        replaceUnit();
      }
      this.focusChaIndexInUnit = -1;
      this.focusUnitIndexInRow = -1;
      this.cursorData.left = this.editLetPadding;
    } else {
      // 移动到上一个unit
      if (arr.length === 1) {
        console.log('剩余1长度');
        if (rowData.length >= this.focusUnitIndexInRow + 2) {
          const lastUnitData = rowData[this.focusUnitIndexInRow - 1];
          const lastLength = lastUnitData.text.length - 1;
          const newText = `${lastUnitData.text}${rowData[this.focusUnitIndexInRow + 1].text}`;
          const newType = this.getUnitType(newText);
          console.log(newText, newType);
          // 如果当前被删除的剩余1长度的unit text + 上一个text 生成一个有效text
          if (newType) {
            // ...
            lastUnitData.text = newText;
            lastUnitData.type = newType;
            rowData.splice(this.focusUnitIndexInRow, 2);
            this.focusUnitIndexInRow -= 1;
            this.focusChaIndexInUnit = lastLength;
          } else {
            // 否则只执行删除
            rowData.splice(this.focusUnitIndexInRow, 1);
            reduceCount();
          }
        } else {
          rowData.splice(this.focusUnitIndexInRow, 1);
          reduceCount();
        }
      } else {
        replaceUnit();
        reduceCount();
      }
    }
    this.setMentionData(null);
  } else {
    const newText = replaceUnit();
    this.focusChaIndexInUnit -= 1;
    this.setMentionData(newText);
  }
  // console.log('deleteTxt后', this.focusUnitIndexInRow, this.focusChaIndexInUnit);
};

// 两个unit合并 根据类型做 合并 还是 分离处理
const unitConnect = function (
  unitAtype,
  unitBtype,
  combineFn,
  splitFn,
) {
  /**
   * 符号分为：有分割效果的符号 和 常规（无分割效果）符号两种
   * 有分割效果的符号: 空格 分割符(包括split和operator)
   */
  // 类型列表: 空格 分割符(包括split和operator) 常规
  // 空格 + 常规.分割符 ： 分割
  // 分割 + 所有 : 分割
  // 常规 + 空格,分割符 : 分割
  if (unitAtype === 'space') {
    if (unitBtype === 'space') {
      combineFn();
    } else {
      splitFn();
    }
  } else if (unitAtype === 'split' || unitAtype === 'operator') {
    splitFn();
  } else if (
    unitBtype === 'space' || unitBtype === 'split' || unitBtype === 'operator'
  ) {
    splitFn();
  } else {
    combineFn();
  }
};


// 返回是否属于 【常规】类型
// 即 非分割效果的符号
const getIsRegularType = function (type) {
  return type !== 'space' && type !== 'split' && type !== 'operator';
};

// 解析字符串生成 unit数组,并更新对应光标，以及私有属性
DataController.prototype.parseStrToUnitArr = function ({
  lastUnitData,
  nextUnitData,
  txt,
}) {
  let unitArr = [];
  let {
    focusRowIndex,
    focusChaIndexInUnit,
    focusUnitIndexInRow,
  } = this;
  txt = txt.replace(/\r\n/g, '\r'); // windows换行转换为 单个换行
  txt = txt.replace(/\t/g, ' '); // 水平制表符转换为空格
  const txtArr = txt.split('');
  let type = this.getUnitType(txtArr[0]);
  let newTxt = null;
  const rowArr = [];
  console.log('txtArr', txt, txtArr, unitArr);
  txtArr.forEach((value, index) => {
    type = this.getUnitType(value);
    console.log('当前解析', value, value.charCodeAt(0).toString(10));
    if (type) {
      if (lastUnitData) {
        if (type === 'breakline') {
          rowArr.push(unitArr);
          lastUnitData = null;
          focusRowIndex += 1;
          this.lineNumList.push(this.lineNumList.length + 1);
          focusUnitIndexInRow = -1;
          focusChaIndexInUnit = -1;
          unitArr = [];
        } else {
          unitConnect(
            lastUnitData.type,
            type,
            () => {
              focusChaIndexInUnit += 1;
              newTxt = `${lastUnitData.text}${value}`;
              lastUnitData.text = newTxt;
              lastUnitData.type = this.getUnitType(newTxt);
            },
            () => {
              focusUnitIndexInRow += 1;
              focusChaIndexInUnit = 0;
              const newUnitData = {
                type,
                text: value,
              };
              lastUnitData = newUnitData;
              unitArr.push(newUnitData);
            },
          );
        }
      } else {
        const newUnitData = {
          type,
          text: value,
        };
        lastUnitData = newUnitData;
        unitArr.push(newUnitData);
        focusUnitIndexInRow += 1;
        focusChaIndexInUnit = 0;
      }
    }
  });
  // 如果有下一个unit数据，解析直接改动下一个unit的txt
  if (unitArr.length > 0 && nextUnitData) {
    const endResUnit = unitArr[unitArr.length - 1];
    if (nextUnitData.type !== 'space' && endResUnit.type !== 'space') {
      newTxt = `${endResUnit.text}${nextUnitData.text}`;
      nextUnitData.text = newTxt;
      nextUnitData.type = this.getUnitType(newTxt);
      unitArr.splice(-1, 1);
    }
  }
  rowArr.push(unitArr);
  this.cursorData.top = this.lineHeight * focusRowIndex;
  this.focusRowIndex = focusRowIndex;
  this.focusUnitIndexInRow = focusUnitIndexInRow;
  this.focusChaIndexInUnit = focusChaIndexInUnit;
  // 返回unitarr 是单纯不算头部，尾部的中间部分
  return rowArr;
};

// 添加单个字符
DataController.prototype.addTxt = function ({
  newTxt,
}) {
  // console.log('addTxt', this.focusUnitIndexInRow, this.focusChaIndexInUnit, this.editUnitListData);
  const rowData = null;
  if (!this.textData[this.focusRowIndex]) {
    this.textData.splice(this.focusRowIndex, 1, []);
  }
  rowData = this.textData[this.focusRowIndex];
  // this.textData[this.focusRowIndex];

  const txtType = this.getUnitType(newTxt);
  const data = {
    type: txtType,
  };
  // 在末尾 append 一个新的unit
  const newAppend = () => {
    // 此处看一下是否可以去掉 判断
    this.focusChaIndexInUnit = 0;
    if (this.focusUnitIndexInRow === null) {
      this.focusUnitIndexInRow = 0;
    } else {
      this.focusUnitIndexInRow += 1;
    }
    data.text = newTxt;
    rowData.splice(this.focusUnitIndexInRow, 1, data);
  };
  let mentionText = null;
  // if (this.focusUnitIndexInRow === null) { // 初始化无数据
  //   newAppend();
  // } else
  if (this.focusUnitIndexInRow === -1) { // 在行头部插入数据
    data.text = newTxt;
    rowData.splice(0, 0, data);
    this.focusUnitIndexInRow = 0;
    this.focusChaIndexInUnit = 0;
    mentionText = newTxt;
  } else {
    // 在行中间或者尾部插入数据
    const focusUnitData = rowData[this.focusUnitIndexInRow];
    const focusText = focusUnitData.text;
    const focusTextHead = focusText.slice(0, this.focusChaIndexInUnit + 1);
    const focusTextTail = focusText.slice(this.focusChaIndexInUnit + 1);
    const focusTxtType = focusUnitData.type;
    const isHasNextUnit = this.focusUnitIndexInRow < rowData.length - 1;
    let nextUnitData = null;
    let nextTxt = null;
    let nextUnitType = null;

    if (isHasNextUnit) {
      nextUnitData = rowData[this.focusUnitIndexInRow + 1];
      nextTxt = nextUnitData.text;
      nextUnitType = nextUnitData.type;
    }
    // 分割 插入 生成3段新的unit
    const splitToThreeUnit = () => {
      rowData.splice(this.focusUnitIndexInRow, 1, {
        text: focusTextHead,
        type: this.getUnitType(focusTextHead),
      }, {
        text: newTxt,
        type: txtType,
      }, {
        text: focusTextTail,
        type: this.getUnitType(focusTextTail),
      });
      this.focusUnitIndexInRow += 1;
      this.focusChaIndexInUnit = 0;
    };
    const combineLastText = () => {
      const resTxt = `${focusText}${newTxt}`;
      this.focusChaIndexInUnit += 1;
      rowData.splice(this.focusUnitIndexInRow, 1, {
        text: resTxt,
        type: this.getUnitType(resTxt),
      });
      return resTxt;
    };
    if (
      this.focusUnitIndexInRow === rowData.length - 1
      && this.focusChaIndexInUnit === rowData[this.focusUnitIndexInRow]
        .text.length - 1
    ) { // console.log('是在行末尾添加');
      unitConnect(
        focusTxtType,
        txtType,
        () => {
          combineLastText();
        },
        () => {
          newAppend();
        },
      );
      // 需要mention txt的条件
      // 空格 + 其他
      // 分割 + 其他
      // 其他 + 其他
      if (getIsRegularType(txtType)) {
        if (getIsRegularType(focusTxtType)) {
          mentionText = `${focusText}${newTxt}`;
        } else {
          mentionText = newTxt;
        }
      }
    } else { // 如果不是在末尾添加
      /**
       * 由于在处理分割类型时 处理空格会做合并处理，其他则做分割处理，所以空格做单独处理
       * 1.当前是空格：
       * 输入是空格：合并3个
       * 输入不是空格，在当前空格中间：分割插入
       * 输入不是空格，在当前空格末尾：
       *  输入是 分割效果符号: 末尾插入新
       *  输入是 常规符号：
       *    下一个是常规: 合并下一个
       *    下一个不是常规：末尾插入新
       * 2.当前是分割符
       * 输入是分割效果符号：末尾插入新
       * 输入是 常规符号：
       *   下一个是常规: 合并下一个
       *   下一个不是常规：末尾插入新
       *
       * 3.当前是常规：
       * 输入是常规：合并3个
       * 输入是分割效果符号： 分割插入
       */

      // 把新字符插入当前unit 并合并 头+new+尾 为一个
      const combineToOneUnit = () => {
        const resTxt = `${focusTextHead}${newTxt}${focusTextTail}`;
        this.focusChaIndexInUnit += 1;
        rowData.splice(this.focusUnitIndexInRow, 1, {
          text: resTxt,
          type: this.getUnitType(resTxt),
        });
      };
      // 把新字符插入当前unit 并合并 头+new+尾 为一个
      const combineNext = () => {
        // 把当前txt 和下一个unit txt合并
        const resTxt = `${newTxt}${nextTxt}`;
        this.focusUnitIndexInRow += 1;
        this.focusChaIndexInUnit = 0;
        rowData.splice(this.focusUnitIndexInRow, 1, {
          text: resTxt,
          type: this.getUnitType(resTxt),
        });
      };
      const handleSplitType = () => {
        if (getIsRegularType(txtType)) {
          if (getIsRegularType(nextUnitType)) {
            combineNext();
          } else {
            newAppend();
          }
        } else {
          newAppend();
        }
      };

      if (focusTxtType === 'space') { // 当前类型是 space
        console.log('上一个类型是 space');
        if (txtType === 'space') { // 输入的是space
          combineToOneUnit();
        } else if (focusText.length - 1 > this.focusChaIndexInUnit) { // 当前输入的不是空 在空格间插入
          splitToThreeUnit();
          mentionText = newTxt;
        } else { // 当前输入的不是space 并且在空格末尾插入
          console.log('当前输入的不是space');
          handleSplitType();
        }
      } else if (focusTxtType === 'split' || focusTxtType === 'operator') {
        handleSplitType();
      } else { // 上一个类型不是 space
        if (getIsRegularType(txtType)) {
          combineToOneUnit();
        } else {
          splitToThreeUnit();
        }
      }
    }
  }
  console.log(newTxt, this.getCharacterWidth(newTxt), this.editWrapRect);
  this.cursorData.left += this.getCharacterWidth(newTxt);

  this.setMentionData(mentionText);
};

// 根据字符str 计算宽度
DataController.prototype.getCharacterWidth = function (str) {
  let width = 0;
  str.split('').forEach((value, index) => {
    if (/[\u4e00-\u9fa5]/.test(value)) {
      width += this.CNWidth;
    } else {
      width += this.characterWidth;
    }
  });

  return width;
};

// 设置提示框的数据
DataController.prototype.setMentionData = function (keyword) {
  if (keyword !== null) { // 此处需要添加 隔断符判断
    const list = keywordsCollection.find({
      text: {
        $contains: keyword,
      },
    });
    const renderList = copy.deepCopy(list);
    const keywordLen = keyword.length;
    renderList.forEach((value, index) => {
      // ...
      const splitText = [];
      const valueText = value.text;
      const keywordIndex = valueText.search(keyword);
      if (keywordIndex > 0) {
        splitText.push({
          text: valueText.slice(0, keywordIndex),
        });
      }
      splitText.push({
        text: keyword,
        type: 'key',
      });
      if (keywordIndex + keywordLen < valueText.length) {
        splitText.push({
          text: valueText.slice(keywordIndex + keywordLen),
        });
      }
      value.splitText = splitText;
    });
    if (list.length > 0) {
      this.mentionData.list = renderList;
      this.mentionData.visible = true;
      this.mentionData.left = this.cursorData.left;
      this.mentionData.top = this.cursorData.top + this.lineHeight - 1;
    } else {
      this.mentionData.visible = false;
    }
  } else {
    this.mentionData.visible = false;
  }
};

// 替换当前focus字符为提示列表 选中文字
DataController.prototype.replaceFocusToMentionWord = function (item) {
  const {
    focusRowIndex,
    focusUnitIndexInRow,
  } = this;
  const {
    text,
  } = item;
  const unitData = this.textData[focusRowIndex][focusUnitIndexInRow];
  unitData.text = text;
  unitData.type = this.getUnitType(text);
  this.mentionData.visible = false;
  this.focusChaIndexInUnit = text.length - 1;
  this.focusUnitByIndex(focusRowIndex, focusUnitIndexInRow, text.length - 1);
  this.focusTextarea();
};

// 根据一段 字符串 插入到当前focus
DataController.prototype.insertTxts = function (
  text,
) {
  if (text.length > 1) {
    this.addTxts(text);
  } else if (text.length === 1) {
    this.addTxt({
      newTxt: text,
    });
  } else {
    this.textData.splice(0);
    this.cursorData.top = 0;
    this.cursorData.left = this.editLetPadding;
    this.focusRowIndex = 0;
    this.focusChaIndexInUnit = -1;
    this.focusUnitIndexInRow = -1;
  }
};

// 添加字符串
DataController.prototype.addTxts = function (newTxt) {
  const {
    focusRowIndex,
    focusUnitIndexInRow,
    focusChaIndexInUnit,
  } = this;
  const copyRowData = this.parseStrToUnitArr({
    txt: newTxt,
  });
  this.insertUnitArr(copyRowData, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit);
};

// 删除文本操作
DataController.prototype.onDelete = function () {
  // console.log('deleteCharacter', this.focusUnitIndexInRow, this.focusChaIndexInUnit);
  const selectAreaLen = this.selectArea.length;
  if (selectAreaLen > 0) { // 如果正在删除选中区域
    const {
      focusRowIndex,
      focusUnitIndexInRow,
      focusChaIndexInUnit,
      textData,
    } = this;
    const startFocusRowIndex = this.startMoveData.focusRowIndex;
    const startFocusUnitIndexInRow = this.startMoveData.focusUnitIndexInRow;
    const startFocusChaIndexInUnit = this.startMoveData.focusChaIndexInUnit;
    const {
      cursorLeft,
      cursorTop,
    } = this.startMoveData;
    const focusRowData = textData[focusRowIndex]; // 当前聚焦的数据
    const focusUnitData = focusRowData[focusUnitIndexInRow];
    const startRowData = textData[startFocusRowIndex]; // 起始的数据
    const startUnitData = startRowData[startFocusUnitIndexInRow];
    const combineTxt = (
      headUnitData,
      headFocusChaIndexInUnit,
      tailUnitData,
      tailFocusChaIndexInUnit,
    ) => {
      const txt = `${headUnitData.text.slice(0, headFocusChaIndexInUnit + 1)}${tailUnitData.text.slice(tailFocusChaIndexInUnit + 1)}`;
      headUnitData.text = txt;
      headUnitData.type = this.getUnitType(txt);
    };
    const setCursorToHead = () => {
      this.cursorData.left = cursorLeft;
      this.cursorData.top = cursorTop;
      this.focusRowIndex = startFocusRowIndex;
      this.focusUnitIndexInRow = startFocusUnitIndexInRow;
      this.focusChaIndexInUnit = startFocusChaIndexInUnit;
    };
    if (selectAreaLen === 1) { // 只选中一行
      // 选中行末尾到中间
      const selectUnitDiff = focusUnitIndexInRow - startFocusUnitIndexInRow;
      const selectUnitDiffAbs = Math.abs(selectUnitDiff);
      console.log(selectUnitDiffAbs);

      if (selectUnitDiffAbs === 0) { // 只选中一个unit
        console.log('只选中一个unit');
        if (focusChaIndexInUnit > startFocusChaIndexInUnit) {
          // 光标恢复到起始位置
          setCursorToHead();
          combineTxt(
            focusUnitData,
            startFocusChaIndexInUnit,
            focusUnitData,
            focusChaIndexInUnit,
          );
        } else {
          combineTxt(
            focusUnitData,
            focusChaIndexInUnit,
            focusUnitData,
            startFocusChaIndexInUnit,
          );
        }
      } else { // 选中2个以上unit
        const deleteOneRowMoreUnit = (
          headUnitData,
          headFocusChaIndexInUnit,
          headFocusUnitIndex,
          tailUnitData,
          tailFocusChaIndexInUnit,
        ) => {
          focusRowData.splice(headFocusUnitIndex + 1, selectUnitDiffAbs);
          combineTxt(
            headUnitData,
            headFocusChaIndexInUnit,
            tailUnitData,
            tailFocusChaIndexInUnit,
          );
        };
        if (focusUnitIndexInRow < startFocusUnitIndexInRow) {
          deleteOneRowMoreUnit(
            focusUnitData,
            focusChaIndexInUnit,
            focusUnitIndexInRow,
            startUnitData,
            startFocusChaIndexInUnit,
          );
        } else {
          deleteOneRowMoreUnit(
            startUnitData,
            startFocusChaIndexInUnit,
            startFocusUnitIndexInRow,
            focusUnitData,
            focusChaIndexInUnit,
          );
          setCursorToHead();
        }
      }
    } else { // 选中两行以上
      const selectRowDiff = focusRowIndex - startFocusRowIndex;
      const selectRowDiffAbs = Math.abs(selectRowDiff);
      const deleteMuliline = (
        headUnitData,
        headFocusChaIndexInUnit,
        tailUnitData,
        tailFocusChaIndexInUnit,
        headRowData,
        headFocusUnitIndex,
        headFocusRowIndex,
        tailRowData,
        tailFocusUnitIndex,
      ) => {
        combineTxt(
          headUnitData,
          headFocusChaIndexInUnit,
          tailUnitData,
          tailFocusChaIndexInUnit,
        );
        tailRowData.splice(0, tailFocusUnitIndex + 1);
        headRowData.splice(headFocusUnitIndex + 1, headRowData.length, ...tailRowData);
        headRowData = headRowData.concat(tailRowData);
        textData.splice(headFocusRowIndex + 1, selectRowDiffAbs);
      };
      if (focusRowIndex < startFocusRowIndex) {
        deleteMuliline(
          focusUnitData,
          focusChaIndexInUnit,
          startUnitData,
          startFocusChaIndexInUnit,
          focusRowData,
          focusUnitIndexInRow,
          focusRowIndex,
          startRowData,
          startFocusUnitIndexInRow,
        );
      } else {
        deleteMuliline(
          startUnitData,
          startFocusChaIndexInUnit,
          focusUnitData,
          focusChaIndexInUnit,
          startRowData,
          startFocusUnitIndexInRow,
          startFocusRowIndex,
          focusRowData,
          focusUnitIndexInRow,
        );
        setCursorToHead();
      }
    }
    this.initSelectLine();
  } else { // 当前字符执行删除操作
    if (this.focusUnitIndexInRow === -1 && this.focusRowIndex > 0) {
      // 光标到最左端
      // 需要添加 如果不是第一行判断，把本行的数据添加到上一行末尾
      // 需要添加 删除两行之间衔接的字符串类型判断
      console.log('光标到最左端', this.focusRowIndex);
      const rowData = copy.deepCopy(this.textData[this.focusRowIndex]);
      const lastRowData = copy.deepCopy(this.textData[this.focusRowIndex - 1]);

      if (lastRowData.length > 0) { // 如果上一行不是空行
        const lastUnit = lastRowData[lastRowData.length - 1];
        if (rowData.length > 0) {
          const firstUnit = rowData[0];
          if (firstUnit.type === lastUnit.type) {
            this.focusChaIndexInUnit = lastUnit.text.length - 1;
            lastUnit.text = `${lastUnit.text}${firstUnit.text}`;
            rowData.splice(0, 1);
          }
          this.textData.splice(this.focusRowIndex - 1, 2, lastRowData.concat(rowData));
        } else {
          this.focusChaIndexInUnit = lastUnit.text.length - 1;
        }
        // 这段计算left 需要改为用rect
        const unitDom = this.rowDomRefs[this.focusRowIndex - 1].lastChild;
        this.cursorData.left = unitDom.offsetLeft + unitDom.offsetWidth;
        this.cursorData.top -= this.lineHeight;
        this.focusUnitIndexInRow = lastRowData.length - 1;
      } else { // 上一行是空行
        this.focusChaIndexInUnit = -1;
        if (rowData.length > 0) {
          this.textData.splice(this.focusRowIndex - 1, 2, rowData);
        }
        // 这段计算left 需要改为用rect
        this.cursorData.left = this.editLetPadding;
        this.cursorData.top -= this.lineHeight;
        this.focusUnitIndexInRow = -1;
      }
      this.focusRowIndex -= 1;
      this.lineNumList.pop();
      console.log(this.textData);
    } else if (this.focusUnitIndexInRow >= 0) {
      this.editText({
        isAddTxt: false,
      });
    }
  }
};

// 回车
DataController.prototype.onEnterClick = function () {
  console.log('onEnterClick', this.textData, this.focusUnitIndexInRow, this.focusChaIndexInUnit);
  const newRow = () => {
    this.lineNumList.push(this.lineNumList.length + 1);
    this.focusUnitIndexInRow = -1;
    this.focusChaIndexInUnit = null;
    this.cursorData.top += this.lineHeight;
    this.cursorData.left = this.editLetPadding;
  };
  if (this.focusUnitIndexInRow === -1) { // 行头部   回车 新增行
    const rowData = this.textData[this.focusRowIndex];
    this.textData.splice(this.focusRowIndex, 1, [], rowData);
    this.focusRowIndex += 1;
    newRow();
  } else if (this.focusUnitIndexInRow === this.textData[this.focusRowIndex].length - 1
    && this.focusChaIndexInUnit === this
      .textData[this.focusRowIndex][this.focusUnitIndexInRow].text.length - 1
  ) { // 在行末尾按下回车
    this.focusRowIndex += 1;
    this.textData.splice(this.focusRowIndex, 0, []);
    newRow();
  } else { // 在行中间按下回车
    this.breakRow();
  }
};

// 回车
DataController.prototype.breakRow = function () {
  console.log('breakRow');
  if (this.focusUnitIndexInRow === -1) {
    this.focusUnitIndexInRow = 0;
  }
  const rowData = this.textData[this.focusRowIndex];
  const unitData = rowData[this.focusUnitIndexInRow];
  const unitCharacterArr = unitData.text.split('');
  const newRowHeadTxtArr = unitCharacterArr.splice(this.focusChaIndexInUnit + 1);
  unitData.text = unitCharacterArr.join('');
  unitData.type = this.getUnitType(unitData.text);
  const newRowTailArr = rowData.splice(this.focusUnitIndexInRow + 1);
  const txt = newRowHeadTxtArr.join('');
  const newRowHeadData = {
    type: this.getUnitType(txt),
    text: txt,
  };
  const newRowArr = [newRowHeadData, ...newRowTailArr];
  this.textData.splice(this.focusRowIndex + 1, 0, newRowArr);
  this.focusRowIndex += 1;
  this.lineNumList.push(this.lineNumList.length + 1);
  this.cursorData.top += this.lineHeight;
  this.cursorData.left = this.editLetPadding;
  this.focusUnitIndexInRow = -1;
  this.focusChaIndexInUnit = -1;

  console.log('breakRow', this.textData, newRowArr);
};

// 按向左箭头
DataController.prototype.cursorMoveLeft = function () {
  this.resetArrowKeyStartIndex();
  const moveLeftCursor = () => {
    this.cursorData.left -= this.getCharacterWidth(this.textData[this.focusRowIndex][this.focusUnitIndexInRow].text[this.focusChaIndexInUnit]);
  };
  if (this.focusChaIndexInUnit > 0) {
    moveLeftCursor();
    this.focusChaIndexInUnit -= 1;
  } else if (this.focusUnitIndexInRow > 0) {
    moveLeftCursor();
    this.focusUnitIndexInRow -= 1;
    this.focusChaIndexInUnit = this.textData[this.focusRowIndex][this.focusUnitIndexInRow]
      .text.length - 1;
  } else if (this.focusUnitIndexInRow === 0) {
    moveLeftCursor();
    this.focusUnitIndexInRow = -1;
    this.focusChaIndexInUnit = -1;
  } else {
    // unit索引是-1 即最左侧
    if (this.focusRowIndex > 0) {
      this.focusRowIndex -= 1;
      this.focusEndRow(this.focusRowIndex);
    } else {
      return;
    }
  }
  console.log('zhihou', this.focusRowIndex, this.focusUnitIndexInRow, this.focusChaIndexInUnit);
};


DataController.prototype.getArrowStartData = function () {
  let focusUnitIndexInRow = null;
  let compareLeft = null;
  if (this.arrowKeyStartFocusUnitIndexInRow === null) {
    ({
      focusUnitIndexInRow,
    } = this);
    this.arrowKeyStartFocusUnitIndexInRow = focusUnitIndexInRow;
    compareLeft = this.cursorData.left + this.editWrapRect.left;
    this.arrowKeyStartCompareLeft = compareLeft;
  } else {
    compareLeft = this.arrowKeyStartCompareLeft;
    focusUnitIndexInRow = this.arrowKeyStartFocusUnitIndexInRow;
  }
  console.log(focusUnitIndexInRow, compareLeft);
  return {
    focusUnitIndexInRow,
    compareLeft,
  };
};

DataController.prototype.cursorMoveCalculatePosition = function (
  focusUnitIndexInRow,
  compareLeft,
) {
  const nextRowChildNodes = this.rowDomRefs[this.focusRowIndex].childNodes;
  const nextRowData = this.textData[this.focusRowIndex];

  if (nextRowData.length > focusUnitIndexInRow) {
    let unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
    // '下一行长度大于unit索引';
    let isFocusEnd = false;
    if (compareLeft < unitRect.right) {
      // 'compareLeft 在左边';
      while (!(compareLeft > unitRect.left && compareLeft <= unitRect.right)) {
        focusUnitIndexInRow -= 1;
        unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
      }
    } else {
      // 'compareLeft 在右边边';
      while (!(compareLeft > unitRect.left && compareLeft <= unitRect.right)) {
        if (focusUnitIndexInRow === nextRowData.length - 1) {
          isFocusEnd = true;
          break;
        } else {
          focusUnitIndexInRow += 1;
          unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
        }
      }
    }

    if (isFocusEnd) {
      this.focusEndRow(this.focusRowIndex);
    } else {
      this.focusUnit({
        focusUnitIndexInRow,
        focusRowIndex: this.focusRowIndex,
        unitRect,
        compareParameter: compareLeft,
        isFocus: false,
      });
    }
  } else {
    // '下一行长度小于等于unit索引';
    // 判断下一行是否有数据
    focusUnitIndexInRow = nextRowData.length - 1;
    if (nextRowData.length > 0) {
      let unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
      if (compareLeft <= unitRect.right) {
        while (!(compareLeft > unitRect.left && compareLeft < unitRect.right)) {
          focusUnitIndexInRow -= 1;
          unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
        }
        this.focusUnit({
          focusUnitIndexInRow,
          focusRowIndex: this.focusRowIndex,
          unitRect,
          compareParameter: compareLeft,
          isFocus: false,
        });
      } else {
        this.focusEndRow(this.focusRowIndex);
      }
    } else {
      this.focusEndRow(this.focusRowIndex);
    }
  }
};

// 按向上箭头
DataController.prototype.cursorMoveUp = function () {
  // 上一行有数据
  if (this.focusRowIndex > 0) {
    const {
      focusUnitIndexInRow,
      compareLeft,
    } = this.getArrowStartData();

    this.focusRowIndex -= 1;
    if (focusUnitIndexInRow === -1) {
      this.cursorData.top -= this.lineHeight;
    } else {
      this.cursorMoveCalculatePosition(focusUnitIndexInRow, compareLeft);
    }
  }
};

// 按向下箭头
DataController.prototype.cursorMoveDown = function () {
  // 下一行有数据
  if (this.textData[this.focusRowIndex + 1]) {
    const {
      focusUnitIndexInRow,
      compareLeft,
    } = this.getArrowStartData();
    this.focusRowIndex += 1;
    if (focusUnitIndexInRow === -1) {
      this.cursorData.top += this.lineHeight;
    } else {
      this.cursorMoveCalculatePosition(focusUnitIndexInRow, compareLeft);
    }
  }
};

// 向下移动一行
DataController.prototype.moveToNextRow = function () {
  if (this.textData[this.focusRowIndex + 1]) {
    this.cursorData.left = this.editLetPadding;
    this.cursorData.top += this.lineHeight;
    this.focusRowIndex += 1;
    this.focusChaIndexInUnit = -1;
    this.focusUnitIndexInRow = -1;
  }
};

DataController.prototype.cursorMoveRight = function () {
  console.log(this.focusRowIndex, this.focusUnitIndexInRow);
  this.resetArrowKeyStartIndex();
  const toNextUnit = () => {
    // 移动到下一个unit
    this.cursorData.left += this.getCharacterWidth(this.textData[this.focusRowIndex][this.focusUnitIndexInRow].text[this.focusChaIndexInUnit]);
    this.focusUnitIndexInRow += 1;
    this.focusChaIndexInUnit = 0;
  };

  const toNextCharactor = () => {
    // 当前unit内移动一个字符
    this.cursorData.left += this.getCharacterWidth(this.textData[this.focusRowIndex][this.focusUnitIndexInRow].text[this.focusChaIndexInUnit]);
    this.focusChaIndexInUnit += 1;
  };

  if (this.focusUnitIndexInRow === -1) {
    if (this.textData[this.focusRowIndex].length > 0) {
      toNextUnit();
    } else if (this.focusRowIndex < this.textData.length - 1) {
      this.moveToNextRow();
    }
  } else if (this.focusChaIndexInUnit
    < this.textData[this.focusRowIndex][this.focusUnitIndexInRow].text.length - 1) {
    toNextCharactor();
  } else if (this.focusUnitIndexInRow < this.textData[this.focusRowIndex].length - 1) {
    toNextUnit();
  } else {
    this.moveToNextRow();
  }
};

// 复制
DataController.prototype.copy = function (e) {
  const {
    focusRowIndex,
    focusUnitIndexInRow,
    focusChaIndexInUnit,
  } = this.startMoveData;
  const tFocusRowIndex = this.focusRowIndex;
  const tFocusUnitIndexInRow = this.focusUnitIndexInRow;
  const tFocusChaIndexInUnit = this.focusChaIndexInUnit;
  const resRowArr = [];

  let txt = null;
  e.clipboardData.setData('text/plain', 'mazhiwenflag');
  // 生成单行 选中数据的 方法
  const generateSingleRowData = (
    frontRowIndex, // 头部focus参数
    frontFocusUnitIndexInRow,
    frontChaIndexInUnit,
    behindFocusUnitIndexInRow, // 尾部focus参数
    behindChaIndexInUnit,
  ) => {
    const resUnitArr = [];
    const frontText = this.textData[frontRowIndex][frontFocusUnitIndexInRow].text;
    if (frontChaIndexInUnit < frontText.length - 1) {
      txt = frontText.slice(frontChaIndexInUnit + 1);
      resUnitArr.push({
        text: txt,
        type: this.getUnitType(txt),
      });
    }
    resUnitArr.push(...this.textData[frontRowIndex].slice(frontFocusUnitIndexInRow + 1, behindFocusUnitIndexInRow));
    txt = this.textData[frontRowIndex][behindFocusUnitIndexInRow].text.slice(0, behindChaIndexInUnit + 1);
    resUnitArr.push({
      text: txt,
      type: this.getUnitType(txt),
    });
    resRowArr.push(resUnitArr);
  };
  // 生成多行 选中数据的 方法
  const generateMultiRowData = (
    frontRowIndex,
    frontFocusUnitIndexInRow,
    frontFocusChaIndexInUnit,
    behindFocusRowIndex,
    behindFocusUnitIndexInRow,
    behindFocusChaIndexInUnit,
  ) => {
    let resUnitArr = [];
    if (frontFocusUnitIndexInRow === -1) {
      if (this.textData[frontRowIndex].length === 0) {
        resUnitArr = [];
      }
    } else if (this.textData[frontRowIndex][frontFocusUnitIndexInRow].text.length - 1 > frontFocusChaIndexInUnit) {
      txt = this.textData[frontRowIndex][frontFocusUnitIndexInRow].text.splice(frontFocusChaIndexInUnit + 1);
      resUnitArr.push({
        text: txt,
        type: this.getUnitType(txt),
      });
    }
    resUnitArr.push(...this.textData[frontRowIndex].slice(frontFocusUnitIndexInRow + 1));
    resRowArr.push(resUnitArr);
    resRowArr.push(...this.textData.slice(frontRowIndex + 1, behindFocusRowIndex));
    resUnitArr = [];
    if (behindFocusUnitIndexInRow !== -1) {
      resUnitArr.push(...this.textData[behindFocusRowIndex].slice(0, behindFocusUnitIndexInRow));
      txt = this.textData[behindFocusRowIndex][behindFocusUnitIndexInRow].text.slice(0, behindFocusChaIndexInUnit + 1);
      resUnitArr.push({
        text: txt,
        type: this.getUnitType(txt),
      });
    }

    resRowArr.push(resUnitArr);
  };
  if (tFocusRowIndex > focusRowIndex) { // 向下行选中
    generateMultiRowData(
      focusRowIndex,
      focusUnitIndexInRow,
      focusChaIndexInUnit,
      tFocusRowIndex,
      tFocusUnitIndexInRow,
      tFocusChaIndexInUnit,
    );
  } else if (tFocusRowIndex < focusRowIndex) { // 向上行选中
    generateMultiRowData(
      tFocusRowIndex,
      tFocusUnitIndexInRow,
      tFocusChaIndexInUnit,
      focusRowIndex,
      focusUnitIndexInRow,
      focusChaIndexInUnit,
    );
  } else { // 在同一行
    if (tFocusUnitIndexInRow > focusUnitIndexInRow) { // 往右侧选中不同unit
      generateSingleRowData(
        focusRowIndex,
        focusUnitIndexInRow,
        focusChaIndexInUnit,
        tFocusUnitIndexInRow,
        tFocusChaIndexInUnit,
      );
    } else if (tFocusUnitIndexInRow < focusUnitIndexInRow) { // 往左侧选中不同unit
      console.log('往左侧选中不同unit起始参数', focusUnitIndexInRow, focusChaIndexInUnit);
      generateSingleRowData(
        focusRowIndex,
        tFocusUnitIndexInRow,
        tFocusChaIndexInUnit,
        focusUnitIndexInRow,
        focusChaIndexInUnit,
      );
    } else { // 同一个unit
      const startText = this.textData[focusRowIndex][focusUnitIndexInRow].text;
      if (tFocusChaIndexInUnit > focusChaIndexInUnit) {
        txt = startText.slice(focusChaIndexInUnit + 1, tFocusChaIndexInUnit + 1);
      } else {
        txt = startText.slice(tFocusChaIndexInUnit + 1, focusChaIndexInUnit + 1);
      }
      const resUnitArr = [];
      resUnitArr.push({
        text: txt,
        type: this.getUnitType(txt),
      });
      resRowArr.push(resUnitArr);
    }
  }
  console.log(resRowArr);
  this.copyRowData = resRowArr;
};

// 粘贴
DataController.prototype.paste = function (pasteTxt) {
  // 这里逻辑需要修改，为粘贴时候只读取粘贴板的string 并即时转换为unitarr。
  // 不需要记录之前的拷贝时候 直接拷贝的unitarr
  // 之前的拷贝操作额外需要 生成string 并写入到粘贴板
  const {
    focusRowIndex,
    focusUnitIndexInRow,
    focusChaIndexInUnit,
  } = this;
  console.log('paste', focusUnitIndexInRow);
  let copyRowData;
  if (pasteTxt !== 'mazhiwenflag') { // 取粘贴板的文本
    copyRowData = this.parseStrToUnitArr({
      txt: pasteTxt,
    });
  } else { // 粘贴本编辑器粘贴到的文本
    ({
      copyRowData,
    } = this);
  }
  this.insertUnitArr(copyRowData, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit);
};


// 插入一个unit 序列组到编辑器内 ,以当前focus为准
DataController.prototype.insertUnitArr = function (
  copyRowData,
  focusRowIndex,
  focusUnitIndexInRow,
  focusChaIndexInUnit,
) {
  let resUnitArr = [];
  let txt = null;
  let focusRow = null;
  if (!this.textData[this.focusRowIndex]) {
    this.textData.splice(this.focusRowIndex, 1, []);
  }
  focusRow = this.textData[focusRowIndex];
  const focusRowLen = focusRow.length;
  const focusUnit = focusRow[focusUnitIndexInRow];
  let newFocusRowIndex = focusRowIndex;
  let newFocusUnitIndexInRow = focusUnitIndexInRow;
  let newFocusChaIndexInUnit = focusChaIndexInUnit;
  let unitTextHead = '';
  let unitTextTail = '';
  if (focusUnit) {
    const unitText = focusUnit.text;
    unitTextHead = unitText.slice(0, focusChaIndexInUnit + 1);
    unitTextTail = unitText.slice(focusChaIndexInUnit + 1);
  }
  console.log(copyRowData);
  const copyFirstRow = copyRowData[0];
  const copyFirstRowLen = copyFirstRow.length;
  const copyRowDataLen = copyRowData.length;
  const copyFirstUnit = copyFirstRow[0];
  const copyFirstUnitLen = copyFirstUnit.text.length;
  let copyLastRow = null;
  let copyLastUnit = null;
  // 处理第一个unit
  const handleFirstUnit = (focusUnitIndexFn) => {
    console.log('handlefirst', copyFirstUnit, focusUnit);
    if (focusUnit) {
      unitConnect(copyFirstUnit.type, focusUnit.type,
        () => {
          txt = `${txt}${copyFirstUnit.text}`;
          resUnitArr.push({
            text: txt,
            type: this.getUnitType(txt),
          });
        },
        () => {
          resUnitArr.push({
            text: txt,
            type: this.getUnitType(txt),
          },
          copyFirstUnit);
          if (focusUnitIndexFn) {
            focusUnitIndexFn();
          }
        });
    } else {
      resUnitArr.push(
        copyFirstUnit,
      );
      if (focusUnitIndexFn) {
        focusUnitIndexFn();
      }
    }
    console.log(JSON.stringify(resUnitArr));
  };
  const handleLastUnit = (focusUnitIndexFn) => {
    const copyLastUnitText = copyLastUnit.text;
    if (focusUnit) {
      unitConnect(copyLastUnit.type, focusUnit.type,
        () => {
          txt = `${copyLastUnitText}${unitTextTail}`;
          resUnitArr.push({
            text: txt,
            type: this.getUnitType(txt),
          });
        },
        () => {
          resUnitArr.push(copyLastUnit);
          if (unitTextTail) { // 插入unit末尾时 值为空 ,判断不是末尾时处理
            resUnitArr.push({
              text: unitTextTail,
              type: this.getUnitType(unitTextTail),
            });
          }
        });
    } else {
      resUnitArr.push(copyLastUnit);
    }
    focusUnitIndexFn();
    newFocusChaIndexInUnit = copyLastUnitText.length - 1;
  };

  txt = unitTextHead;
  if (copyRowDataLen >= 2) { // 粘贴板数据2行以上
    handleFirstUnit();
    // 处理第一行剩下的unit
    resUnitArr.push(...copyFirstRow.slice(1));
    // 保留 当前focus行 尾部unit列
    const focusRowTail = this.textData[focusRowIndex].slice(focusUnitIndexInRow + 1, focusRowLen);
    // 插入新的第一行
    this.textData[focusRowIndex].splice(focusUnitIndexInRow, focusRowLen, ...resUnitArr);


    const hasDataLastIndexRow = copyRowDataLen - 1;
    // while (copyRowData[hasDataLastIndexRow].length === 0) {
    //   hasDataLastIndexRow -= 1;
    // }
    if (copyRowData[hasDataLastIndexRow].length > 0) { // 最后一行有数据
      // 处理末行
      copyLastRow = copyRowData[hasDataLastIndexRow];
      // 处理粘贴板最后一行前面unit
      resUnitArr = copyLastRow.slice(0, -1);
      copyLastUnit = copyLastRow[copyLastRow.length - 1];
      // 处理粘贴板第二行最后一个unit
      handleLastUnit(() => {
        newFocusUnitIndexInRow = copyLastRow.length - 1;
      });
      // 处理当前focus行 尾部unit列
      resUnitArr.push(...focusRowTail);
    } else { // 最后一行没数据
      resUnitArr = focusRowTail;
      if (resUnitArr.length > 0) {
        newFocusUnitIndexInRow = resUnitArr.length - 1;
        newFocusChaIndexInUnit = resUnitArr[resUnitArr.length - 1].text.length - 1;
      } else {
        newFocusRowIndex += 1;
        newFocusUnitIndexInRow = -1;
        newFocusChaIndexInUnit = -1;
      }
    }
    // 插入新生成的末行
    if (copyRowDataLen > 2) { // 粘贴板数据3行以上
      // 插入中间行 + 末行
      this.textData.splice(focusRowIndex + 1, 0, ...copyRowData.slice(1, -1), resUnitArr);
    } else { // 插入末行
      this.textData.splice(focusRowIndex + 1, 0, resUnitArr);
    }
    newFocusRowIndex += copyRowDataLen - 1;
    this.lineNumList.length = newFocusRowIndex + 1;
  } else { // 粘贴板数据共1行
    if (copyFirstRowLen >= 2) { // 如果粘贴板unit >= 2个
      handleFirstUnit(() => {
        newFocusUnitIndexInRow += 1;
      });
      // 插入中间unit
      resUnitArr.push(...copyFirstRow.slice(1, -1));
      // 处理最后一个unit
      copyLastUnit = copyFirstRow[copyFirstRowLen - 1];
      handleLastUnit(() => {
        newFocusUnitIndexInRow += copyFirstRowLen - 1;
      });
    } else { // 粘贴板unit 1个
      if (focusUnit) {
        unitConnect(copyFirstUnit.type, focusUnit.type,
          () => {
            txt = `${txt}${copyFirstUnit.text}${unitTextTail}`;
            resUnitArr.push({
              text: txt,
              type: this.getUnitType(txt),
            });
            newFocusChaIndexInUnit += copyFirstUnitLen;
          },
          () => {
            resUnitArr.push({
              text: txt,
              type: this.getUnitType(txt),
            },
            copyFirstUnit, {
              text: unitTextTail,
              type: this.getUnitType(unitTextTail),
            });
            newFocusUnitIndexInRow += 1;
            newFocusChaIndexInUnit = copyFirstUnitLen - 1;
          });
      } else {
        resUnitArr.push(
          copyFirstUnit,
        );
        newFocusUnitIndexInRow += 1;
        newFocusChaIndexInUnit = copyFirstUnitLen - 1;
      }
    }

    this.textData[focusRowIndex].splice(focusUnitIndexInRow, 1, ...resUnitArr);
  }
  this.focusRowIndex = newFocusRowIndex;
  this.focusUnitIndexInRow = newFocusUnitIndexInRow;
  this.focusChaIndexInUnit = newFocusChaIndexInUnit;
  setTimeout(() => {
    this.focusUnitByIndex(newFocusRowIndex, newFocusUnitIndexInRow, newFocusChaIndexInUnit);
  }, 0);
};

// 获取内容
DataController.prototype.getContent = function () {
  let content = '';
  const rowLen = this.textData.length;
  this.textData.forEach((value, index) => {
    value.forEach((valueU, indexU) => {
      content = `${content}${valueU.text}`;
    });
    if (index < rowLen - 1) {
      content = `${content}\r\n`;
    }
  });
  console.log(content);
  return content;
};


export default {
  DataController,
};
