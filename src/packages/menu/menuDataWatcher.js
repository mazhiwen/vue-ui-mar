const menuDataController = function ({
  lastActiveIndex,
  scrollFromIndex,
  onItemClickListenerHander,
}) {
  this.parsedData = null;
  this.scrollData = null;
  this.lastActiveIndex = lastActiveIndex || '0';
  this.scrollFromIndex = scrollFromIndex || 1;
  this.onItemClickListenerHander = onItemClickListenerHander || function () {};
  this.valueKeyMap = {};
  this.isUseValue = null;
  this.keysList = [];
};

// å¼ç¨
menuDataController.prototype.setScrollFromIndex = function (p_scrollFromIndex) {
  this.scrollFromIndex = p_scrollFromIndex;
};

// å¼ç¨
menuDataController.prototype.setLastActiveIndex = function (p_LastActiveIndex) {
  this.lastActiveIndex = p_LastActiveIndex;
};

// å¼ç¨
menuDataController.prototype.setIsUseValue = function (param) {
  this.isUseValue = param;
};

// çææ°æ®valueï¼key map
menuDataController.prototype.generateValueKeyMap = function (data, prefixIndex) {
  data.forEach((value, index) => {
    let realIndex;
    if (prefixIndex) {
      realIndex = `${prefixIndex}-${index}`;
    } else {
      realIndex = `${index}`;
    }
    const itemValue = value.value;
    if (itemValue) {
      this.valueKeyMap[itemValue] = realIndex;
    }
    this.keysList.push(realIndex);
    value.children && this.generateValueKeyMap(value.children, realIndex);
  });
};

menuDataController.prototype.setMenuData = function (params) {
  // console.log("setMenuData",params);
  this.parsedData = params.parsedData;
  this.scrollData = params.scrollData;
  this.generateValueKeyMap(this.parsedData.concat(this.scrollData), null);
  // console.log("æ§è¡å®parseindex list ï¼",this.valueKeyMap,this.keysList);
  // console.log("setMenuData æ§è¡setactive",this.lastActiveIndex);
  this.setActive(this.lastActiveIndex, true);
};

menuDataController.prototype.onItemClick = function (handlerFn) {
  this.onItemClickListenerHander = handlerFn;
};

menuDataController.prototype.parseIndex = function (index) {
  // console.log("parseIndex",index,this.valueKeyMap,this.keysList);
  if (this.valueKeyMap[index]) {
    return this.valueKeyMap[index];
  }
  if (this.keysList.includes(index)) {
    return index;
  }
  return false;
};

menuDataController.prototype.setDefaultActive = function (index) {
  this.defaultActive = index;
  this.lastActiveIndex = index;
};

menuDataController.prototype.setActive = function (currentIndex, force) {
  // console.log("setActiveå¥å£",this.lastActiveIndex,currentIndex);
  const lastActiveIndex = this.parseIndex(this.lastActiveIndex);
  currentIndex = this.parseIndex(currentIndex);
  if (currentIndex === false) {
    currentIndex = this.parseIndex(this.defaultActive);
  }
  if (currentIndex === false || lastActiveIndex === false) return;
  // å¤æ­æ°activeçindexæ¯å¦ç­äºæ§index
  // force : å¼ºå¶æ¸²ææ°æ® æè æ¯åå§æ¸²ææ°æ®æ¶éè¦å¼ºå¶åæ°æ®active
  if (force || lastActiveIndex != currentIndex) {
    // å¤æ­æ¯å¦æ§è¡è¿æ°æ®åå§å
    if (this.scrollData && this.parsedData) {
      // åæ¶ä¸ä¸ä¸ªèåæ çæ¿æ´»ç¶æ
      this.setMenuTreeActiveStatus(lastActiveIndex, false);
      // æ¿æ´»èåæ æé®
      this.setMenuTreeActiveStatus(currentIndex, true);
    }
    this.lastActiveIndex = currentIndex;
  }
};

menuDataController.prototype.sendItemClick = function ({
  index,
  item,
  value,
}) {
  // console.log("èåç¹å»äºä»¶sendItemClick",index);
  // console.log("sendItemClick æ§è¡setactive");
  this.setActive(index);
  // valueå¼æ¯æ ¹æ®dataItemæ¯å¦ævalueæ¥è¿åï¼å¦æævalueåè¿åvalue,å¦åè¿åindexPath(å³å¦: 0-0-0)
  // indexåæ¯indexPath
  // item æ¯å½åæ°æ®dataItem
  this.onItemClickListenerHander(value, index);
};

// è®¾ç½®èåæ æé®æ¿æ´»ç¶æ
menuDataController.prototype.setMenuTreeActiveStatus = function (index, status) {
  // console.log("setMenuTreeActiveStatus",index,status);
  const traverseArr = index.toString().split('-');
  let prefixData;
  // å¦æåºç°æ»å¨æ°æ®ï¼å¹¶ä¸å½åæ°æ®çindexå¨æ»å¨æ°æ®èå´å,åéå½æ»å¨æ°æ®
  if (
    this.scrollData.length > 0 && traverseArr[0] >= this.scrollFromIndex
  ) {
    prefixData = this.scrollData;
    traverseArr[0] -= this.scrollFromIndex;
  } else {
    prefixData = this.parsedData;
  }
  traverseArr.forEach((value) => {
    prefixData[value].active = status;
    prefixData = prefixData[value].children;
  });
};

export default {
  menuDataController,
};