module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: !0
});

function isIteration(a) {
  var b = Object.prototype.toString.call(a);
  return '[object Object]' == b || '[object Array]' == b;
}

function deepCopy(a) {
  if (!isIteration(a)) throw new Error('error arguments'); // const targetObj = obj.constructor === Array ? [] : {};

  var b = Array.isArray(a) ? [] : {};

  for (var c in a) //只对对象自有属性进行拷贝
  a.hasOwnProperty(c) && (b[c] = isIteration(a[c]) ? deepCopy(a[c]) : a[c]);

  return b;
} // 获取数组的并集


function unionArray() {
  var a = [];
  return Array.prototype.map.call(arguments, function (b) {
    b.map(function (b) {
      a.includes(b) || a.push(b);
    });
  }), a;
} // let deepDiffResult = true;
// function deepDiff(obj, targetObj) {
//   deepDiffResult=true;
//   deepDiffIteration(obj, targetObj);
//   return deepDiffResult;
// }


var deepDiff = function () {
  function a(c, d) {
    if (!isIteration(c)) throw new Error('error arguments');
    console.log('uninkey\u5F00\u59CB'), console.log(Object.keys(c), Object.keys(d));
    var e = unionArray(Object.keys(c), Object.keys(d));
    console.log('uninkey\u7ED3\u675F');
    var f = !0,
        g = !1,
        h = void 0;

    try {
      for (var i, j, k = e[Symbol.iterator](); !(f = (i = k.next()).done); f = !0) {
        if (j = i.value, !(c.hasOwnProperty(j) && d.hasOwnProperty(j))) return void (b = !1);
        if (isIteration(c[j])) a(c[j], d[j]);else if (d[j] !== c[j]) return void (b = !1);
      }
    } catch (a) {
      g = !0, h = a;
    } finally {
      try {
        !f && k.return && k.return();
      } finally {
        if (g) throw h;
      }
    }
  }

  var b = null;
  return function (c, d) {
    return b = !0, a(c, d), b;
  };
}(); // console.log(unionArray([1, 2], [3, 2]));
// console.log(deepDiff(
//   [{
//     dimData: {
//       column: [1],
//       row: [3, 2]
//     }
//   }, {
//     dimData: {
//       column: [1],
//       row: [3, 4]
//     }
//   }],
//   [{
//     dimData: {
//       column: [1],
//       row: [3, 2, 5]
//     }
//   }, {
//     dimData: {
//       column: [1],
//       row: [3, 4]
//     }
//   }]
// ));


exports.default = {
  deepCopy: deepCopy,
  deepDiff: deepDiff
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(10);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/menu/Menu.vue?vue&type=template&id=1a722ab4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "m_menu_wrap", staticClass: "m_menu_wrap" }, [
    _c(
      "div",
      { ref: "m_menu", staticClass: "m_menu first_row_wrap" },
      [
        _c("MenuItem", {
          attrs: {
            data: _vm.parsedData,
            isRootLevel: true,
            dataController: _vm.menuDataControllerInstance
          }
        })
      ],
      1
    ),
    _vm.scrollData.length > 0
      ? _c(
          "div",
          { staticClass: "m_menu" },
          [
            _c("el-button", {
              staticClass: "leftbtn",
              attrs: { type: "text", icon: "el-icon-arrow-left" },
              on: { click: _vm.scrollLeft }
            }),
            _c("div", { ref: "scroll_wrap", staticClass: "scroll_wrap" }, [
              _c(
                "div",
                {
                  ref: "scroll_wrap_inner",
                  staticClass: "scroll_wrap_inner first_row_wrap",
                  style: _vm.scrollStyle
                },
                [
                  _c("MenuItem", {
                    attrs: {
                      startIndex: _vm.scrollFromIndex,
                      data: _vm.scrollData,
                      isRootLevel: true,
                      dataController: _vm.menuDataControllerInstance
                    }
                  })
                ],
                1
              )
            ]),
            _c("el-button", {
              staticClass: "rightbtn",
              attrs: { type: "text", icon: "el-icon-arrow-right" },
              on: { click: _vm.scrollRight }
            })
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/packages/menu/Menu.vue?vue&type=template&id=1a722ab4&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/menu/MenuItem.vue?vue&type=template&id=7a925159&
var MenuItemvue_type_template_id_7a925159_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "current_menuitem_ref",
      staticClass: "m_menuitem_box",
      class: {
        m_menuitem_box_rowtype: !_vm.isSecondLevel && !_vm.isRootLevel,
        m_menuitem_box_leftwrap: _vm.isLeftWrap
      }
    },
    _vm._l(_vm.data, function(value, index) {
      return _c(
        "div",
        {
          key: index,
          staticClass: "m_menu_item",
          class: { active: value.active },
          on: {
            mouseenter: function($event) {
              return _vm.mouseenter(value, $event, index)
            },
            mouseleave: function($event) {
              return _vm.mouseleave(value, $event, index)
            }
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "item_label",
              on: {
                click: function($event) {
                  _vm.itemClick(
                    value,
                    _vm.getItemIndex(
                      value,
                      "" + _vm.indexPre + (_vm.startIndex + index)
                    )
                  )
                }
              }
            },
            [
              _vm._v("\n      " + _vm._s(value.label) + "\n      "),
              value.labelExtra
                ? _c("span", { staticClass: "itemnum" }, [
                    _vm._v(
                      "\n        (" + _vm._s(value.labelExtra) + ")\n      "
                    )
                  ])
                : _vm._e(),
              value.children && value.children.length > 0
                ? [
                    _vm.isRootLevel
                      ? _c("i", {
                          staticClass: "m_menu_icon el-icon-arrow-down",
                          class: {
                            m_menuicon_up: value.childVisible,
                            m_menuicon_down: !value.childVisible
                          }
                        })
                      : _c("i", {
                          staticClass: "m_menu_icon el-icon-arrow-right",
                          class: {
                            m_menuicon_right: !value.childVisible,
                            m_menuicon_left: value.childVisible
                          }
                        })
                  ]
                : _vm._e()
            ],
            2
          ),
          _c(
            "transition",
            { attrs: { name: "fade" } },
            [
              !_vm.isRootLevel &&
              value.children &&
              value.children.length > 0 &&
              value.childVisible
                ? _c("MenuItem", {
                    attrs: {
                      indexPre:
                        "" + _vm.indexPre + (_vm.startIndex + index) + "-",
                      data: value.children,
                      isLeftWrap: _vm.shouldChildrenLeftWrap,
                      dataController: _vm.dataController
                    }
                  })
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    }),
    0
  )
}
var MenuItemvue_type_template_id_7a925159_staticRenderFns = []
MenuItemvue_type_template_id_7a925159_render._withStripped = true


// CONCATENATED MODULE: ./src/packages/menu/MenuItem.vue?vue&type=template&id=7a925159&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/menu/MenuItem.vue?vue&type=script&lang=js&
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
var getItemIndex = function getItemIndex(value, index) {
  return {
    value: value.value ? value.value.toString() : "".concat(index),
    index: "".concat(index)
  };
};

var movingFromRoot;
/* harmony default export */ var MenuItemvue_type_script_lang_js_ = ({
  name: "MenuItem",
  // inject: ["onItemClick"],
  props: {
    dataController: Object,
    indexPre: {
      type: String,
      "default": ""
    },
    data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    isRootLevel: {
      type: Boolean,
      "default": false
    },
    isSecondLevel: {
      type: Boolean,
      "default": false
    },
    // startIndex: [Number]
    startIndex: {
      type: Number,
      "default": 0
    },
    isLeftWrap: {
      type: Boolean
    }
  },
  components: {},
  data: function data() {
    return {
      shouldChildrenLeftWrap: false
    };
  },
  filters: {
    getItemIndex: getItemIndex
  },
  computed: {},
  created: function created() {},
  watch: {},
  mounted: function mounted() {},
  updated: function updated() {},
  beforeDestroy: function beforeDestroy() {},
  methods: {
    getItemIndex: getItemIndex,
    mouseenter: function mouseenter(item, event, index) {
      if (this.isRootLevel) {
        var rect = event.target.getBoundingClientRect();
        this.$dropMenu({
          dataController: this.dataController,
          data: item.children,
          left: rect.left,
          top: rect.bottom,
          visible: true,
          indexPre: "".concat(this.startIndex + index, "-"),
          dropMenuFixRight: rect.left > document.body.clientWidth - 200,
          item: item
        });
      } else {
        if (this.$refs["current_menuitem_ref"]) {
          this.shouldChildrenLeftWrap = this.isLeftWrap || this.$refs["current_menuitem_ref"].getBoundingClientRect().right > document.body.clientWidth - 200;
        }
      }

      item.childVisible = true;
    },
    mouseleave: function mouseleave(item, event, index) {
      if (this.isRootLevel) {
        var rect = event.target.getBoundingClientRect();
        var clientX = event.clientX,
            clientY = event.clientY; // 判断是否鼠标滑动到子菜单

        if (clientX > rect.left && clientX < rect.right, clientY >= rect.bottom) {} else {
          this.$dropMenu({
            dataController: this.dataController,
            visible: false
          });
          item.childVisible = false;
        }
      } else {
        item.childVisible = false;
      }
    },
    itemClick: function itemClick(item, _ref) {
      var value = _ref.value,
          index = _ref.index;
      item.active = true;
      this.dataController.sendItemClick({
        index: index,
        item: item,
        value: value
      });
    }
  }
});
// CONCATENATED MODULE: ./src/packages/menu/MenuItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_MenuItemvue_type_script_lang_js_ = (MenuItemvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/packages/menu/MenuItem.vue





/* normalize component */

var component = normalizeComponent(
  menu_MenuItemvue_type_script_lang_js_,
  MenuItemvue_type_template_id_7a925159_render,
  MenuItemvue_type_template_id_7a925159_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/packages/menu/MenuItem.vue"
/* harmony default export */ var MenuItem = (component.exports);
// EXTERNAL MODULE: ./node_modules/utility-mar/lib/copy.js
var copy = __webpack_require__(0);
var copy_default = /*#__PURE__*/__webpack_require__.n(copy);

// CONCATENATED MODULE: ./node_modules/utility-mar/index.js








// CONCATENATED MODULE: ./src/packages/menu/menuDataWatcher.js
var menuDataController = function menuDataController(_ref) {
  var lastActiveIndex = _ref.lastActiveIndex,
      scrollFromIndex = _ref.scrollFromIndex,
      onItemClickListenerHander = _ref.onItemClickListenerHander;
  this.parsedData = null;
  this.scrollData = null;
  this.lastActiveIndex = lastActiveIndex || "0";
  this.scrollFromIndex = scrollFromIndex || 1;

  this.onItemClickListenerHander = onItemClickListenerHander || function () {};

  this.valueKeyMap = {};
  this.isUseValue = null;
  this.keysList = [];
}; // å¼ç¨


menuDataController.prototype.setScrollFromIndex = function (p_scrollFromIndex) {
  this.scrollFromIndex = p_scrollFromIndex;
}; // å¼ç¨


menuDataController.prototype.setLastActiveIndex = function (p_LastActiveIndex) {
  this.lastActiveIndex = p_LastActiveIndex;
}; // å¼ç¨


menuDataController.prototype.setIsUseValue = function (param) {
  this.isUseValue = param;
}; // çææ°æ®valueï¼key map


menuDataController.prototype.generateValueKeyMap = function (data, prefixIndex) {
  var _this = this;

  data.forEach(function (value, index) {
    var realIndex;

    if (prefixIndex) {
      realIndex = "".concat(prefixIndex, "-").concat(index);
    } else {
      realIndex = "".concat(index);
    }

    var itemValue = value.value;

    if (itemValue) {
      _this.valueKeyMap[itemValue] = realIndex;
    }

    _this.keysList.push(realIndex);

    value.children && _this.generateValueKeyMap(value.children, realIndex);
  });
};

menuDataController.prototype.setMenuData = function (params) {
  // console.log("setMenuData",params);
  this.parsedData = params.parsedData;
  this.scrollData = params.scrollData;
  this.generateValueKeyMap(this.parsedData.concat(this.scrollData), null); // console.log("æ§è¡å®parseindex list ï¼",this.valueKeyMap,this.keysList);
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
  } else if (this.keysList.includes(index)) {
    return index;
  } else {
    return false;
  }
};

menuDataController.prototype.setDefaultActive = function (index) {
  this.defaultActive = index;
  this.lastActiveIndex = index;
};

menuDataController.prototype.setActive = function (currentIndex, force) {
  // console.log("setActiveå¥å£",this.lastActiveIndex,currentIndex);
  var lastActiveIndex = this.parseIndex(this.lastActiveIndex);
  currentIndex = this.parseIndex(currentIndex);

  if (currentIndex === false) {
    currentIndex = this.parseIndex(this.defaultActive);
  }

  ;
  if (currentIndex === false || lastActiveIndex === false) return; // å¤æ­æ°activeçindexæ¯å¦ç­äºæ§index
  // force : å¼ºå¶æ¸²ææ°æ® æè æ¯åå§æ¸²ææ°æ®æ¶éè¦å¼ºå¶åæ°æ®active

  if (force || lastActiveIndex != currentIndex) {
    // å¤æ­æ¯å¦æ§è¡è¿æ°æ®åå§å
    if (this.scrollData && this.parsedData) {
      //åæ¶ä¸ä¸ä¸ªèåæ çæ¿æ´»ç¶æ
      this.setMenuTreeActiveStatus(lastActiveIndex, false); // æ¿æ´»èåæ æé®

      this.setMenuTreeActiveStatus(currentIndex, true);
    }

    this.lastActiveIndex = currentIndex;
  }
};

menuDataController.prototype.sendItemClick = function (_ref2) {
  var index = _ref2.index,
      item = _ref2.item,
      value = _ref2.value;
  // console.log("èåç¹å»äºä»¶sendItemClick",index);
  // console.log("sendItemClick æ§è¡setactive");
  this.setActive(index); // valueå¼æ¯æ ¹æ®dataItemæ¯å¦ævalueæ¥è¿åï¼å¦æævalueåè¿åvalue,å¦åè¿åindexPath(å³å¦: 0-0-0)
  // indexåæ¯indexPath
  // item æ¯å½åæ°æ®dataItem

  this.onItemClickListenerHander(value, index);
}; // è®¾ç½®èåæ æé®æ¿æ´»ç¶æ


menuDataController.prototype.setMenuTreeActiveStatus = function (index, status) {
  // console.log("setMenuTreeActiveStatus",index,status);
  var traverseArr = index.toString().split("-");
  var prefixData; // å¦æåºç°æ»å¨æ°æ®ï¼å¹¶ä¸å½åæ°æ®çindexå¨æ»å¨æ°æ®èå´å,åéå½æ»å¨æ°æ®

  if (this.scrollData.length > 0 && traverseArr[0] >= this.scrollFromIndex) {
    prefixData = this.scrollData;
    traverseArr[0] -= this.scrollFromIndex;
  } else {
    prefixData = this.parsedData;
  }

  traverseArr.forEach(function (value) {
    prefixData[value].active = status;
    prefixData = prefixData[value].children;
  });
};

/* harmony default export */ var menuDataWatcher = ({
  menuDataController: menuDataController
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/menu/Menu.vue?vue&type=script&lang=js&
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



console.log(copy_default.a);
var scrollStep = 150;
/* harmony default export */ var Menuvue_type_script_lang_js_ = ({
  name: "MarMenu",
  props: {
    data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    index: [String, Number],
    scrollFromIndex: {
      type: Number,
      "default": 1,
      validator: function validator(value) {
        // 最小是1,否则设置无效,会报错
        return value;
      }
    },
    defaultActive: {
      type: [Number, String],
      "default": 0
    }
  },
  components: {
    MenuItem: MenuItem
  },
  data: function data() {
    return {
      scrollStyle: {
        left: "0px"
      },
      lastActiveIndex: "0",
      //*******************注意！！！！！！！***************************
      // value 和 默认index格式 0-0-0 ,不可重复,需要全局唯一值
      // 因为初始化数据会生成 value-Index map表
      // 内部计算index先查找value-Index map表,
      // 查找到则按照当前传入值为value处理，否则按照index处理
      datas: [{
        label: "1aaaaa",
        childVisible: false,
        active: true,
        // data每个item 的value值如果设置了，点击事件回传的就是改值，
        // 如果没设置就回传默认的index索引序列
        value: "ffff",
        children: [{
          label: "1_1"
        }, {
          label: "1_2",
          childVisible: false,
          children: [{
            label: "1_2_1",
            childVisible: false,
            children: [{
              label: "1_2_1_1"
            }, {
              label: "1_2_1_2"
            }]
          }, {
            label: "1_2_2"
          }]
        }]
      }, {
        label: "2级根标题级根标题级根标题级级根标根标题级",
        childVisible: false,
        children: [{
          label: "2_1",
          childVisible: false,
          children: [{
            label: "2_1_1",
            childVisible: false,
            children: [{
              label: "2_1_1_1"
            }, {
              label: "2_1_1_2"
            }]
          }, {
            label: "1_2_2"
          }]
        }]
      }, {
        label: "3级根标题",
        childVisible: false,
        children: [{
          label: "3_1"
        }]
      }, {
        label: "4级根标题级根标题级根标题级级根标根标题级"
      }, {
        label: "5级根标题级根标题级根标题级级根标根标题级"
      }, {
        label: "6级根标题级根标题级根标题级级根标根标题级"
      }, {
        label: "7级根标题级根标题级根标题级级根标根标题级"
      }, {
        label: "8级根标题级根标题级根标题级级根标根标题级"
      }],
      scrollData: [],
      parsedData: [],
      menuDataControllerInstance: null
    };
  },
  filters: {},
  computed: {},
  watch: {
    data: function data(newV, oldV) {
      this.initData(newV);
    },
    defaultActive: function defaultActive(newV, oldV) {
      // console.log("defaultActive 执行setactive",newV);
      // this.menuDataControllerInstance.setActive(newV);
      this.menuDataControllerInstance.setDefaultActive(newV);
    }
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;

    this.menuDataControllerInstance = new menuDataWatcher.menuDataController({
      lastActiveIndex: this.defaultActive,
      scrollFromIndex: this.scrollFromIndex,
      onItemClickListenerHander: function onItemClickListenerHander(value) {
        _this.$emit("onItemClick", value);
      }
    });
    this.initData(this.data);
  },
  beforeDestroy: function beforeDestroy() {},
  methods: {
    initData: function initData(arr) {
      var _this2 = this;

      // console.log("执行initdata",arr);
      if (arr.length > 0) {
        var recurision = function recurision(data) {
          data.forEach(function (value) {
            value.active = false;

            if (value.children) {
              value.childVisible = false;
              recurision(value.children);
            }
          });
        };

        recurision(arr);
        this.parsedData = copy_default.a.deepCopy(this.data);
        this.$nextTick(function () {
          if (_this2.$refs["m_menu"].offsetWidth > _this2.$refs["m_menu_wrap"].clientWidth + 1) {
            _this2.scrollData = _this2.parsedData.splice(_this2.scrollFromIndex);
          }

          _this2.menuDataControllerInstance.setMenuData({
            parsedData: _this2.parsedData,
            scrollData: _this2.scrollData
          });
        });
      }
    },
    scrollRight: function scrollRight() {
      // 外部固定宽度包裹dom
      var outerWidth = this.$refs["scroll_wrap"].offsetWidth; // 内部内容长度

      var innerWidth = this.$refs["scroll_wrap_inner"].offsetWidth;
      var offsetLeft = Math.abs(parseInt(this.scrollStyle.left));
      var maxOffsetLeft = innerWidth - outerWidth;

      if (offsetLeft < maxOffsetLeft) {
        if (maxOffsetLeft - offsetLeft < scrollStep) {
          offsetLeft = maxOffsetLeft;
        } else {
          offsetLeft += scrollStep;
        }
      } else {
        return;
      }

      this.scrollStyle.left = "-".concat(offsetLeft, "px");
    },
    scrollLeft: function scrollLeft() {
      var offsetLeft = Math.abs(parseInt(this.scrollStyle.left));
      if (offsetLeft <= 0) return;
      offsetLeft = offsetLeft >= scrollStep ? offsetLeft - scrollStep : 0;
      this.scrollStyle.left = "-".concat(offsetLeft, "px");
    }
  }
});
// CONCATENATED MODULE: ./src/packages/menu/Menu.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_Menuvue_type_script_lang_js_ = (Menuvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/packages/menu/Menu.vue





/* normalize component */

var Menu_component = normalizeComponent(
  menu_Menuvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Menu_api; }
Menu_component.options.__file = "src/packages/menu/Menu.vue"
/* harmony default export */ var Menu = (Menu_component.exports);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread.js
var objectSpread = __webpack_require__(1);
var objectSpread_default = /*#__PURE__*/__webpack_require__.n(objectSpread);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/menu/DropMenu/DropMenu.vue?vue&type=template&id=11b04350&
var DropMenuvue_type_template_id_11b04350_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.visible
      ? _c(
          "div",
          {
            staticClass: "m_menu_dropwrap",
            style: {
              left: _vm.dropMenuFixRight ? "unset" : _vm.left + "px",
              top: _vm.top + "px",
              right: _vm.dropMenuFixRight ? "200px" : "unset"
            },
            on: {
              mouseleave: function($event) {
                return _vm.dropMenuMouseleave($event)
              }
            }
          },
          [
            _c("MenuItem", {
              attrs: {
                data: _vm.data,
                indexPre: _vm.indexPre,
                isSecondLevel: true,
                dataController: _vm.dataController
              }
            })
          ],
          1
        )
      : _vm._e()
  ])
}
var DropMenuvue_type_template_id_11b04350_staticRenderFns = []
DropMenuvue_type_template_id_11b04350_render._withStripped = true


// CONCATENATED MODULE: ./src/packages/menu/DropMenu/DropMenu.vue?vue&type=template&id=11b04350&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/menu/DropMenu/DropMenu.vue?vue&type=script&lang=js&
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

/* harmony default export */ var DropMenuvue_type_script_lang_js_ = ({
  props: {
    dataController: Object,
    visible: {
      type: Boolean,
      "default": false
    },
    left: {
      type: Number,
      "default": 0
    },
    top: {
      type: Number,
      "default": 0
    },
    data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    indexPre: {
      type: String,
      "default": ""
    },
    dropMenuFixRight: {
      type: Boolean,
      "default": false
    },
    item: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  components: {
    MenuItem: MenuItem
  },
  mounted: function mounted() {},
  updated: function updated() {},
  methods: {
    dropMenuMouseleave: function dropMenuMouseleave(event) {
      var rect = event.target.getBoundingClientRect();
      var clientX = event.clientX,
          clientY = event.clientY; // 判断是否鼠标滑动到子菜单

      if (clientX > rect.left && clientX < rect.right, clientY <= rect.top) {} else {
        this.$dropMenu({
          visible: false
        });
        this.item.childVisible = false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/packages/menu/DropMenu/DropMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var DropMenu_DropMenuvue_type_script_lang_js_ = (DropMenuvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/packages/menu/DropMenu/DropMenu.vue





/* normalize component */

var DropMenu_component = normalizeComponent(
  DropMenu_DropMenuvue_type_script_lang_js_,
  DropMenuvue_type_template_id_11b04350_render,
  DropMenuvue_type_template_id_11b04350_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var DropMenu_api; }
DropMenu_component.options.__file = "src/packages/menu/DropMenu/DropMenu.vue"
/* harmony default export */ var DropMenu = (DropMenu_component.exports);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(2);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./src/packages/menu/DropMenu/index.js




var DropMenuConstructor = external_vue_default.a.extend(DropMenu);
var DropMenuInstance = null;

var DropMenu_initDom = function initDom(params) {
  DropMenuInstance = new DropMenuConstructor({
    el: document.createElement("div"),
    propsData: objectSpread_default()({}, params)
  });
  document.body.appendChild(DropMenuInstance.$el);
};

var activeDropMenu = function activeDropMenu(params) {
  if (!DropMenuInstance) {
    DropMenu_initDom(params);
  }

  for (var key in params) {
    DropMenuInstance.$props[key] = params[key];
  }

  if (typeof params.visible == "boolean") {
    DropMenuInstance.$props["visible"] = params.visible;
  }
};

var DropMenuPlugin = {
  install: function install(Vue) {
    Vue.component(Menu.name, Menu);
    Vue.prototype.$dropMenu = activeDropMenu;
  }
}; // export default DropMenuPlugin;

/* harmony default export */ var menu_DropMenu = (activeDropMenu);
// CONCATENATED MODULE: ./src/packages/index.js


var components = [Menu];

var packages_install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
  Vue.prototype.$dropMenu = menu_DropMenu;
};

if (typeof window !== 'undefined' && window.Vue) {
  packages_install(window.Vue);
}

/* harmony default export */ var src_packages = __webpack_exports__["default"] = ({
  version: 'fk',
  install: packages_install
});

/***/ })
/******/ ])["default"];