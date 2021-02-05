/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([15,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/edit/Edit/index.vue?vue&type=template&id=8c2010ee&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "m_edit" }, [
    _c(
      "ul",
      { staticClass: "rownum_wrap" },
      _vm._l(_vm.dataController.lineNumList, function(value, index) {
        return _c("li", { key: index }, [
          _vm._v("\n      " + _vm._s(index + 1) + "\n    ")
        ])
      }),
      0
    ),
    _c(
      "div",
      {
        ref: "edit",
        staticClass: "m_edit_wrap",
        on: {
          dragover: function($event) {
            return _vm.onEditAreaDragover($event)
          },
          drop: function($event) {
            return _vm.onEditAreaDrop($event)
          }
        }
      },
      [
        _c("div", { staticClass: "edit_fonttest" }, [
          _c("pre", [_c("span", { ref: "fonttestNum" }, [_vm._v("1")])]),
          _c("pre", [_c("span", { ref: "fonttestCN" }, [_vm._v("一")])])
        ]),
        _c(
          "div",
          {
            staticClass: "m_edit_cursorwrap",
            style: {
              visibility: _vm.cursorVisble,
              left: _vm.dataController.cursorData.left + "px",
              top: _vm.dataController.cursorData.top + "px"
            }
          },
          [_c("div")]
        ),
        _c(
          "div",
          {
            staticClass: "m_edit_mentionWrap",
            style: {
              visibility: _vm.dataController.mentionData.visible
                ? "visible"
                : "hidden",
              left: _vm.dataController.mentionData.left + "px",
              top: _vm.dataController.mentionData.top + "px"
            }
          },
          [
            _c(
              "ul",
              _vm._l(_vm.dataController.mentionData.list, function(
                value,
                index
              ) {
                return _c(
                  "li",
                  {
                    key: index,
                    on: {
                      click: function($event) {
                        return _vm.mentionItemClick(value)
                      }
                    }
                  },
                  _vm._l(value.splitText, function(valueL, indexL) {
                    return _c(
                      "span",
                      {
                        key: indexL,
                        class: { mentionkeyword: valueL.type == "key" }
                      },
                      [
                        _vm._v(
                          "\n            " +
                            _vm._s(valueL.text) +
                            "\n          "
                        )
                      ]
                    )
                  }),
                  0
                )
              }),
              0
            )
          ]
        ),
        _c(
          "div",
          {
            staticClass: "e_edit_textareawrap",
            style: {
              left: _vm.dataController.cursorData.left + "px",
              top: _vm.dataController.cursorData.top + "px"
            }
          },
          [
            _c("textarea", {
              ref: "textarea",
              on: {
                input: function($event) {
                  return _vm.onTextAreaChange($event)
                },
                paste: function($event) {
                  return _vm.onTextareaPaste($event)
                }
              }
            })
          ]
        ),
        _c(
          "div",
          { staticClass: "e_edit_selectwrap" },
          _vm._l(_vm.dataController.selectArea, function(value, index) {
            return _c("div", {
              key: index,
              staticClass: "m_selectline",
              style: {
                left: value.left + "px",
                top: value.top + "px",
                width: value.width + "px"
              }
            })
          }),
          0
        ),
        _c(
          "div",
          {
            staticClass: "m_edit_contentwrap",
            on: {
              mousedown: function($event) {
                return _vm.onMouseDown($event)
              },
              mouseup: function($event) {
                return _vm.onMouseUp($event)
              },
              mousemove: function($event) {
                return _vm.onMouseMove($event)
              }
            }
          },
          _vm._l(_vm.textData, function(value, index) {
            return _c(
              "div",
              { key: index, staticClass: "edit_rowwrap" },
              [
                _c("EditUnitList", {
                  attrs: {
                    data: value,
                    "data-controller": _vm.dataController,
                    "row-index": index
                  },
                  on: { stopMouseMove: _vm.stopMouseMove }
                })
              ],
              1
            )
          }),
          0
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/packages/edit/Edit/index.vue?vue&type=template&id=8c2010ee&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/edit/EditUnitList/index.vue?vue&type=template&id=16f9176b&
var EditUnitListvue_type_template_id_16f9176b_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "rowtext_wrap",
      on: {
        mousedown: function($event) {
          return _vm.onRowMouseDown($event)
        },
        mouseup: function($event) {
          return _vm.onRowMouseUp($event)
        }
      }
    },
    [
      _c(
        "pre",
        { ref: "rowDomRef" },
        _vm._l(_vm.data, function(value, index) {
          return _c(
            "span",
            {
              key: index,
              staticClass: "unitItem",
              class: _vm.getItemClass(value),
              on: {
                dragstart: function($event) {
                  return _vm.onDragStart(value)
                },
                dragover: function($event) {
                  return _vm.onDragover($event, value, index)
                },
                drop: function($event) {
                  return _vm.onDrop($event)
                },
                mousedown: function($event) {
                  return _vm.onUnitMouseDown($event, value, index)
                },
                mouseup: function($event) {
                  return _vm.onUnitMouseUp($event, value, index)
                },
                mousemove: function($event) {
                  return _vm.onUnitMouseOver($event, value, index)
                }
              }
            },
            [_vm._v(_vm._s(value.text))]
          )
        }),
        0
      )
    ]
  )
}
var EditUnitListvue_type_template_id_16f9176b_staticRenderFns = []
EditUnitListvue_type_template_id_16f9176b_render._withStripped = true


// CONCATENATED MODULE: ./src/packages/edit/EditUnitList/index.vue?vue&type=template&id=16f9176b&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/edit/EditUnitList/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import config from '../config';

/** item 值obj
 * 这一行是旧数据
 * { id: 1, data: '+', name: '+', code: '+',
      以下是新数据
      text: '',
      type: 'operator',
    }
 */
/* harmony default export */ var EditUnitListvue_type_script_lang_js_ = ({
  props: {
    data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    rowIndex: {
      type: Number,
      "default": function _default() {
        return 0;
      }
    },
    dataController: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      isMousePressing: false,
      mouseEventData: {
        clientX: null,
        clientY: null
      }
    };
  },
  computed: {// data: function () {
    //   return this.dataController.editUnitListData;
    // },
  },
  mounted: function mounted() {
    this.dataController.rowDomRefs[this.rowIndex] = this.$refs.rowDomRef;
  },
  methods: {
    onRowMouseDown: function onRowMouseDown(e) {
      e.stopPropagation();
      this.dataController.onRowMouseDown(e, this.rowIndex);
    },
    onRowMouseUp: function onRowMouseUp(e) {
      e.stopPropagation();
      this.dataController.getBoundingData();
      this.dataController.onRowMouseUp(e, this.rowIndex);
    },
    onUnitMouseDown: function onUnitMouseDown(e, data, focusUnitIndexInRow) {
      e.stopPropagation();
      this.dataController.onUnitMouseDown(focusUnitIndexInRow, this.rowIndex, e.target.getBoundingClientRect(), e);
    },
    onUnitMouseOver: function onUnitMouseOver(e, data, focusUnitIndexInRow) {
      e.stopPropagation();
      this.dataController.onUnitMouseOver(focusUnitIndexInRow, this.rowIndex, e.target.getBoundingClientRect(), e);
    },
    onUnitMouseUp: function onUnitMouseUp(e, data, focusUnitIndexInRow) {
      e.stopPropagation();
      this.dataController.getBoundingData();
      this.dataController.onUnitMouseUp(focusUnitIndexInRow, this.rowIndex, e.target.getBoundingClientRect(), e);
    },
    getItemClass: function getItemClass(value) {
      var res = {
        item_dragging: value.isDragging
      };
      res["item_".concat(value.type)] = true;
      return res;
    },
    onDragStart: function onDragStart() {
      console.log(this.dataController);
    },
    onDragover: function onDragover(e, data, index) {
      console.log('子级Dragover', data.code);
      e.preventDefault();
      e.stopPropagation();
      var rect = e.target.getBoundingClientRect();
      console.log();

      if (e.clientX > rect.left + rect.width / 2) {
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
    onDrop: function onDrop(e) {
      console.log('子级Drop');
      e.preventDefault();
      e.stopPropagation();
      this.dataController.clearCurrentDragData();
    }
  }
});
// CONCATENATED MODULE: ./src/packages/edit/EditUnitList/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var edit_EditUnitListvue_type_script_lang_js_ = (EditUnitListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/packages/edit/EditUnitList/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  edit_EditUnitListvue_type_script_lang_js_,
  EditUnitListvue_type_template_id_16f9176b_render,
  EditUnitListvue_type_template_id_16f9176b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/packages/edit/EditUnitList/index.vue"
/* harmony default export */ var EditUnitList = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/edit/Edit/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import config from '../config';

/* harmony default export */ var Editvue_type_script_lang_js_ = ({
  name: 'MarEdit',
  components: {
    EditUnitList: EditUnitList
  },
  props: {
    content: {
      type: String,
      "default": function _default() {
        return '';
      }
    },
    dataController: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    config: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      textData: [],
      cursorVisble: 'visible',
      cursorInterval: null,
      isMousePressing: false,
      mouseEventData: {
        clientX: null,
        clientY: null
      }
    };
  },
  computed: {},
  watch: {
    config: {
      handler: function handler(newV) {
        this.dataController.mergeConfig(newV);
      },
      deep: true,
      immediate: true
    },
    content: {
      handler: function handler(newV) {
        this.dataController.insertTxts(newV);
        this.dataController.focusTextarea();
      },
      immediate: true
    }
  },
  created: function created() {
    this.addGlobalEvent();
    this.textData = this.dataController.textData; // const fontTestDom = document.createElement('div');
    // document.body.appendChild();
  },
  mounted: function mounted() {
    var _this = this;

    // this.dataController.characterWidth = this.$refs.fonttestNum.getBoundingClientRect().width;
    // this.dataController.CNWidth = this.$refs.fonttestCN.getBoundingClientRect().width;
    // 保存DOM ref引用
    this.dataController.editRef = this.$refs.edit;
    this.dataController.fonttestNumRef = this.$refs.fonttestNum;
    this.dataController.fonttestCNRef = this.$refs.fonttestCN;
    this.dataController.getBoundingData(); // 光标事件

    this.cursorInterval = setInterval(function () {
      _this.cursorVisble = 'hidden';
      setTimeout(function () {
        _this.cursorVisble = 'visible';
      }, 700);
    }, 1400); // this.dataController.editWrapRect = this.$refs.edit.getBoundingClientRect();

    this.dataController.inputTexareaDom = this.$refs.textarea;
    this.dataController.initFocus();
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.cursorInterval);
  },
  methods: {
    // vue v-show当前组件时，会造成当前组件mounted的时候未能获取到正确的clientrect。需要重新active
    // getBoundingData() {
    //   this.dataController.editWrapRect = this.$refs.edit.getBoundingClientRect();
    //   this.dataController.characterWidth = this.$refs.fonttestNum.getBoundingClientRect().width;
    //   this.dataController.CNWidth = this.$refs.fonttestCN.getBoundingClientRect().width;
    // },
    mentionItemClick: function mentionItemClick(item) {
      //
      console.log(item);
      this.dataController.replaceFocusToMentionWord(item);
    },
    onTextareaPaste: function onTextareaPaste(e) {
      // 粘贴
      e.preventDefault();
      var pasteTxt = (e.clipboardData || window.clipboardData).getData('text');
      console.log('onTextareaPaste', pasteTxt);
      this.dataController.paste(pasteTxt);
    },
    onMouseDown: function onMouseDown(e) {
      console.log('onMouseDown', e);
    },
    onMouseMove: function onMouseMove(e) {
      var eClientX = e.clientX;
      var eClientY = e.clientY;
      var oClientX = this.mouseEventData.clientX;
      var oClientY = this.mouseEventData.clientY;

      if (this.isMousePressing && (eClientX !== oClientX || eClientY !== oClientY)) {
        console.log('onMouseMove');
      }
    },
    onMouseUp: function onMouseUp(e) {
      console.log('外层onMouseUp', e);
      this.dataController.getBoundingData();
      this.dataController.initFocus();
    },
    stopMouseMove: function stopMouseMove() {
      this.isMousePressing = false;
    },
    // textarea每次输入新的值会触发input事件
    onTextAreaChange: function onTextAreaChange(e) {
      console.log('onTextAreaChange', e.data);

      if (e.data != null) {
        this.dataController.editText({
          newTxt: e.data,
          isAddTxt: true
        });
      }
    },
    addGlobalEvent: function addGlobalEvent() {
      var _this2 = this;

      // 全局增加drop事件
      document.addEventListener('dragover', function (e) {
        e.preventDefault();
        console.log('document dragover');
      }, false);
      document.addEventListener('drop', function (e) {
        e.preventDefault();
        console.log('document drop');
        console.log(_this2.dataController.temporaryInsertIndex);

        _this2.dataController.cancelDrag();
      }, false);
      document.addEventListener('copy', function (e) {
        e.preventDefault();

        _this2.dataController.copy(e);
      });
      document.addEventListener('keydown', function (e) {
        // console.log(e);
        var keyCode = e.keyCode,
            altKey = e.altKey,
            ctrlKey = e.ctrlKey,
            metaKey = e.metaKey,
            shiftKey = e.shiftKey;

        if (ctrlKey) {
          if (keyCode === 67) {// 复制
            // this.dataController.copy();
            // e.clipboardData.setData('text/plain', 'fuckyou');
          } else if (keyCode === 86) {// 粘贴
          }
        } else if (keyCode === 8) {
          // 删除
          _this2.dataController.onDelete();
        } else if (keyCode === 13) {
          // 回车键
          _this2.dataController.onEnterClick();
        } else if (keyCode === 37) {
          // 左
          _this2.dataController.cursorMoveLeft();
        } else if (keyCode === 38) {
          // 上
          _this2.dataController.cursorMoveUp();
        } else if (keyCode === 39) {
          // 右
          _this2.dataController.cursorMoveRight();
        } else if (keyCode === 40) {
          // 下
          _this2.dataController.cursorMoveDown();
        } else if (keyCode === 9) {
          // tab键
          e.preventDefault();

          _this2.dataController.addTxts('  ');
        } // 判断键盘按键为有效输入字符
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
    onEditAreaDragover: function onEditAreaDragover(e) {
      // console.log('父级Dragover');
      e.preventDefault();
      e.stopPropagation();
      this.dataController.insertCurrentDraggingToList(this.dataController.originDataLength);
    },
    onEditAreaDrop: function onEditAreaDrop(e) {
      console.log('父级Drop');
      e.preventDefault();
      e.stopPropagation();
      this.dataController.clearCurrentDragData();
    }
  }
});
// CONCATENATED MODULE: ./src/packages/edit/Edit/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var edit_Editvue_type_script_lang_js_ = (Editvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/packages/edit/Edit/index.vue





/* normalize component */

var Edit_component = Object(componentNormalizer["a" /* default */])(
  edit_Editvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Edit_api; }
Edit_component.options.__file = "src/packages/edit/Edit/index.vue"
/* harmony default export */ var Edit = (Edit_component.exports);
// EXTERNAL MODULE: ./src/packages/styles/edit.less
var edit = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(1);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// EXTERNAL MODULE: ./src/packages/utils/index.js
var utils = __webpack_require__(2);

// CONCATENATED MODULE: ./src/packages/edit/index.js




lodash_default.a.has(undefined, '_gzipSize');


Object(utils["a" /* default */])();
/* harmony default export */ var packages_edit = __webpack_exports__["default"] = (Edit);

/***/ })

/******/ });