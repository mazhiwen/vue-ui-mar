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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(13);

var iterableToArray = __webpack_require__(14);

var nonIterableSpread = __webpack_require__(15);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(12);

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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

module.exports = _objectDestructuringEmpty;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Menu/Menu.vue?vue&type=template&id=22661a86&
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
            "is-root-level": true,
            "data-controller": _vm.menuDataControllerInstance
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
                      "start-index": _vm.scrollFromIndex,
                      data: _vm.scrollData,
                      "is-root-level": true,
                      "data-controller": _vm.menuDataControllerInstance
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


// CONCATENATED MODULE: ./src/packages/Menu/Menu.vue?vue&type=template&id=22661a86&

// EXTERNAL MODULE: ./node_modules/utility-mar/lib/copy.js
var copy = __webpack_require__(2);
var copy_default = /*#__PURE__*/__webpack_require__.n(copy);

// CONCATENATED MODULE: ./node_modules/utility-mar/index.js








// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Menu/MenuItem.vue?vue&type=template&id=65569139&
var MenuItemvue_type_template_id_65569139_render = function() {
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
var MenuItemvue_type_template_id_65569139_staticRenderFns = []
MenuItemvue_type_template_id_65569139_render._withStripped = true


// CONCATENATED MODULE: ./src/packages/Menu/MenuItem.vue?vue&type=template&id=65569139&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Menu/MenuItem.vue?vue&type=script&lang=js&
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
// CONCATENATED MODULE: ./src/packages/Menu/MenuItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var Menu_MenuItemvue_type_script_lang_js_ = (MenuItemvue_type_script_lang_js_); 
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

// CONCATENATED MODULE: ./src/packages/Menu/MenuItem.vue





/* normalize component */

var component = normalizeComponent(
  Menu_MenuItemvue_type_script_lang_js_,
  MenuItemvue_type_template_id_65569139_render,
  MenuItemvue_type_template_id_65569139_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/packages/Menu/MenuItem.vue"
/* harmony default export */ var MenuItem = (component.exports);
// CONCATENATED MODULE: ./src/packages/Menu/menuDataWatcher.js
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
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Menu/Menu.vue?vue&type=script&lang=js&
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
  name: 'MarMenu',
  components: {
    MenuItem: MenuItem
  },
  filters: {},
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
  data: function data() {
    return {
      scrollStyle: {
        left: '0px'
      },
      lastActiveIndex: '0',
      //* ******************注意！！！！！！！***************************
      // value 和 默认index格式 0-0-0 ,不可重复,需要全局唯一值
      // 因为初始化数据会生成 value-Index map表
      // 内部计算index先查找value-Index map表,
      // 查找到则按照当前传入值为value处理，否则按照index处理
      datas: [{
        label: '1aaaaa',
        childVisible: false,
        active: true,
        // data每个item 的value值如果设置了，点击事件回传的就是改值，
        // 如果没设置就回传默认的index索引序列
        value: 'ffff',
        children: [{
          label: '1_1'
        }, {
          label: '1_2',
          childVisible: false,
          children: [{
            label: '1_2_1',
            childVisible: false,
            children: [{
              label: '1_2_1_1'
            }, {
              label: '1_2_1_2'
            }]
          }, {
            label: '1_2_2'
          }]
        }]
      }, {
        label: '2级根标题级根标题级根标题级级根标根标题级',
        childVisible: false,
        children: [{
          label: '2_1',
          childVisible: false,
          children: [{
            label: '2_1_1',
            childVisible: false,
            children: [{
              label: '2_1_1_1'
            }, {
              label: '2_1_1_2'
            }]
          }, {
            label: '1_2_2'
          }]
        }]
      }, {
        label: '3级根标题',
        childVisible: false,
        children: [{
          label: '3_1'
        }]
      }, {
        label: '4级根标题级根标题级根标题级级根标根标题级'
      }, {
        label: '5级根标题级根标题级根标题级级根标根标题级'
      }, {
        label: '6级根标题级根标题级根标题级级根标根标题级'
      }, {
        label: '7级根标题级根标题级根标题级级根标根标题级'
      }, {
        label: '8级根标题级根标题级根标题级级根标根标题级'
      }],
      scrollData: [],
      parsedData: [],
      menuDataControllerInstance: null
    };
  },
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
        _this.$emit('onItemClick', value);
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
          if (_this2.$refs.m_menu.offsetWidth > _this2.$refs.m_menu_wrap.clientWidth + 1) {
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
      var outerWidth = this.$refs.scroll_wrap.offsetWidth; // 内部内容长度

      var innerWidth = this.$refs.scroll_wrap_inner.offsetWidth;
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
// CONCATENATED MODULE: ./src/packages/Menu/Menu.vue?vue&type=script&lang=js&
 /* harmony default export */ var Menu_Menuvue_type_script_lang_js_ = (Menuvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/packages/Menu/Menu.vue





/* normalize component */

var Menu_component = normalizeComponent(
  Menu_Menuvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Menu_api; }
Menu_component.options.__file = "src/packages/Menu/Menu.vue"
/* harmony default export */ var Menu = (Menu_component.exports);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread.js
var objectSpread = __webpack_require__(1);
var objectSpread_default = /*#__PURE__*/__webpack_require__.n(objectSpread);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Menu/DropMenu/DropMenu.vue?vue&type=template&id=88050b10&
var DropMenuvue_type_template_id_88050b10_render = function() {
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
                "index-pre": _vm.indexPre,
                "is-second-level": true,
                "data-controller": _vm.dataController
              }
            })
          ],
          1
        )
      : _vm._e()
  ])
}
var DropMenuvue_type_template_id_88050b10_staticRenderFns = []
DropMenuvue_type_template_id_88050b10_render._withStripped = true


// CONCATENATED MODULE: ./src/packages/Menu/DropMenu/DropMenu.vue?vue&type=template&id=88050b10&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Menu/DropMenu/DropMenu.vue?vue&type=script&lang=js&
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
  components: {
    MenuItem: MenuItem
  },
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
      "default": ''
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
// CONCATENATED MODULE: ./src/packages/Menu/DropMenu/DropMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var DropMenu_DropMenuvue_type_script_lang_js_ = (DropMenuvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/packages/Menu/DropMenu/DropMenu.vue





/* normalize component */

var DropMenu_component = normalizeComponent(
  DropMenu_DropMenuvue_type_script_lang_js_,
  DropMenuvue_type_template_id_88050b10_render,
  DropMenuvue_type_template_id_88050b10_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var DropMenu_api; }
DropMenu_component.options.__file = "src/packages/Menu/DropMenu/DropMenu.vue"
/* harmony default export */ var DropMenu = (DropMenu_component.exports);
// CONCATENATED MODULE: ./src/packages/Menu/DropMenu/index.js




var DropMenuConstructor = external_vue_default.a.extend(DropMenu);
var DropMenuInstance = null;

var DropMenu_initDom = function initDom(params) {
  DropMenuInstance = new DropMenuConstructor({
    el: document.createElement('div'),
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

  if (typeof params.visible === 'boolean') {
    DropMenuInstance.$props.visible = params.visible;
  }
};

var DropMenuPlugin = {
  install: function install(Vue) {
    Vue.component(Menu.name, Menu);
    Vue.prototype.$dropMenu = activeDropMenu;
  }
}; // export default DropMenuPlugin;

/* harmony default export */ var Menu_DropMenu = (activeDropMenu);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Edit/Edit/index.vue?vue&type=template&id=04a3bf69&
var Editvue_type_template_id_04a3bf69_render = function() {
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
          },
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
var Editvue_type_template_id_04a3bf69_staticRenderFns = []
Editvue_type_template_id_04a3bf69_render._withStripped = true


// CONCATENATED MODULE: ./src/packages/Edit/Edit/index.vue?vue&type=template&id=04a3bf69&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Edit/EditUnitList/index.vue?vue&type=template&id=2652016a&
var EditUnitListvue_type_template_id_2652016a_render = function() {
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
        },
        mousemove: function($event) {
          return _vm.onRowMouseOver($event)
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
var EditUnitListvue_type_template_id_2652016a_staticRenderFns = []
EditUnitListvue_type_template_id_2652016a_render._withStripped = true


// CONCATENATED MODULE: ./src/packages/Edit/EditUnitList/index.vue?vue&type=template&id=2652016a&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Edit/EditUnitList/index.vue?vue&type=script&lang=js&
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
    onRowMouseOver: function onRowMouseOver(e) {},
    onRowMouseUp: function onRowMouseUp(e) {
      e.stopPropagation();
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
// CONCATENATED MODULE: ./src/packages/Edit/EditUnitList/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var Edit_EditUnitListvue_type_script_lang_js_ = (EditUnitListvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/packages/Edit/EditUnitList/index.vue





/* normalize component */

var EditUnitList_component = normalizeComponent(
  Edit_EditUnitListvue_type_script_lang_js_,
  EditUnitListvue_type_template_id_2652016a_render,
  EditUnitListvue_type_template_id_2652016a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var EditUnitList_api; }
EditUnitList_component.options.__file = "src/packages/Edit/EditUnitList/index.vue"
/* harmony default export */ var EditUnitList = (EditUnitList_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/Edit/Edit/index.vue?vue&type=script&lang=js&
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
    data: {
      type: Array,
      "default": function _default() {
        return [];
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
  created: function created() {
    this.addGlobalEvent();
    this.textData = this.dataController.textData;
  },
  mounted: function mounted() {
    var _this = this;

    this.dataController.characterWidth = this.$refs.fonttestNum.getBoundingClientRect().width;
    this.dataController.CNWidth = this.$refs.fonttestCN.getBoundingClientRect().width;
    this.cursorInterval = setInterval(function () {
      _this.cursorVisble = 'hidden';
      setTimeout(function () {
        _this.cursorVisble = 'visible';
      }, 700);
    }, 1400);
    this.dataController.editWrapRect = this.$refs.edit.getBoundingClientRect();
    this.dataController.inputTexareaDom = this.$refs.textarea;
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.cursorInterval);
  },
  methods: {
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
      console.log('onMouseUp', e);
      this.dataController.initFocus();
    },
    stopMouseMove: function stopMouseMove() {
      this.isMousePressing = false;
    },
    // textarea每次输入新的值会触发input事件
    onTextAreaChange: function onTextAreaChange(e) {
      console.log('onTextAreaChange', e);

      if (e.data != null) {
        this.dataController.onIputNewTxt(e.data);
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
        console.log(e);
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
          _this2.dataController.deleteCharacter();
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

          _this2.dataController.addTxts({
            newTxt: '  '
          });
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
// CONCATENATED MODULE: ./src/packages/Edit/Edit/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var Edit_Editvue_type_script_lang_js_ = (Editvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/packages/Edit/Edit/index.vue





/* normalize component */

var Edit_component = normalizeComponent(
  Edit_Editvue_type_script_lang_js_,
  Editvue_type_template_id_04a3bf69_render,
  Editvue_type_template_id_04a3bf69_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Edit_api; }
Edit_component.options.__file = "src/packages/Edit/Edit/index.vue"
/* harmony default export */ var Edit = (Edit_component.exports);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectDestructuringEmpty.js
var objectDestructuringEmpty = __webpack_require__(4);
var objectDestructuringEmpty_default = /*#__PURE__*/__webpack_require__.n(objectDestructuringEmpty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(0);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./src/packages/Edit/EditorDataController.js



 // import test from './test.js';
// parseStrToUnitArr 在addtxts的某些引用方法错误
// 翻页
// 需要做粘贴后 focus
// 粘贴头尾分别是末端的时候
// 换行功能
// 完成focusbyindex方法
// 简化单位变量
// 根据domref 取unitrect 的方法抽离
// 删除功能，本行删完，上一行是空时

var DataController = function DataController(_ref) {
  var parama = _ref.parama;
  // 当前拖动的元item数据
  this.currentDraggingData = null; // 实际操作并展示的数据元的集合

  this.editUnitListData = [];
  this.textData = [[]]; // ///////////////// 临时加的，后期删掉
  // this.textData = test;
  // 行索引

  this.focusRowIndex = 0; // 拖动状态下 当前暂时插入的 偏移位 unit index in unitlist

  this.temporaryInsertIndex = null; // 源数据的长度

  this.originDataLength = 0;
  this.unitInRowLengthList = [];
  this.cursorData = {
    left: -10,
    top: 0
  };
  this.editWrapRect = {};
  this.inputTexareaDom = null; // 行dom元素

  this.rowDomRef = null;
  this.rowDomRefs = []; // 当前focus的unit index

  this.focusUnitIndexInRow = -1; // 当前focues的 unit中的字符串的index位置

  this.focusChaIndexInUnit = null; // 行数值列表

  this.lineNumList = [1]; // ///////////////// 临时加的，后期删掉
  // this.lineNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];

  this.isMouseMoving = false; // 鼠标按下时的选中client数据 以及 rowindex

  this.startMoveData = {
    cursorLeft: null,
    cursorTop: null,
    focusRowIndex: null,
    focusUnitIndexInRow: null,
    focusChaIndexInUnit: null,
    clientX: null,
    clientY: null
  };
  this.characterWidth = null;
  this.CNWidth = null; // 按上下键时，标记的起始触发按键的 行中focus unit的索引位置.

  this.arrowKeyStartFocusUnitIndexInRow = null;
  this.arrowKeyStartCompareLeft = null; // 鼠标按下选中区域

  this.selectArea = []; // 粘贴板的文本数据 行

  this.copyRowData = []; // 编辑框左侧padding

  this.editLetPadding = 4;
}; // 拖动相关:


DataController.prototype.setOnDraggingData = function (data) {
  this.currentDraggingData = objectSpread_default()({}, data, {
    isDragging: true
  });
}; // 拖动相关: 添加当前拖动数据到行末尾


DataController.prototype.appendCurrentToList = function () {
  this.appendDataToList(this.currentDraggingData);
}; // 添加字符数据到行末尾


DataController.prototype.appendDataToList = function (data) {
  var index = this.editUnitListData.length;
  this.focusUnitIndexInRow = index;
  this.spliceUnitToList({
    spliceParams: [this.focusUnitIndexInRow, 0, data],
    isAddTxt: true
  });
  console.log(this.editUnitListData);
}; // 拖动相关:  插入当前拖动数据字符数据到行


DataController.prototype.insertCurrentDraggingToList = function (index) {
  console.log('insertCurrentDraggingToList', index, this.temporaryInsertIndex);
  if (index === this.temporaryInsertIndex) return;

  if (this.temporaryInsertIndex !== null) {
    this.editUnitListData.splice(this.temporaryInsertIndex, 1);
  } // 这里操作 currentDraggingData 需要深拷贝一次


  this.spliceUnitToList({
    spliceParams: [index, 0, this.currentDraggingData]
  });
  this.temporaryInsertIndex = index;
}; // 插入字符数据到行数据 数值操作,并且更新光标位置


DataController.prototype.spliceUnitToList = function (_ref2) {
  var _this$editUnitListDat,
      _this = this;

  var spliceParams = _ref2.spliceParams,
      isGoToLastUnit = _ref2.isGoToLastUnit,
      isAddTxt = _ref2.isAddTxt,
      data = _ref2.data,
      isAddNewUnit = _ref2.isAddNewUnit,
      newTxt = _ref2.newTxt;

  (_this$editUnitListDat = this.editUnitListData).splice.apply(_this$editUnitListDat, toConsumableArray_default()(spliceParams));

  var focusUnitIndexInRow = spliceParams[0]; // const currentUnitData = spliceParams[2];
  // 操作光标
  // 如果是删除元素，当前unitindex -1；

  if (isGoToLastUnit) {
    // focusUnitIndexInRow -= 1;
    if (this.focusUnitIndexInRow >= 1) {
      this.focusUnitIndexInRow -= 1; // this.focusChaIndexInUnit = this.editUnitListData[this.focusUnitIndexInRow].length;
    } else {
      this.focusUnitIndexInRow = -1;
    }
  }

  var currentUnitData = this.editUnitListData[focusUnitIndexInRow]; // 研究一下 vue 设置this.data，刷新dom后，执行settimeout 0 的事件

  setTimeout(function () {
    console.log(focusUnitIndexInRow); // 研究一下，可能是字体原因，pre字体还没渲染的时候一个字符宽度是9，所以此时拿到的offsetWidth是9, 1000ms后才是7;

    var unitDom = _this.rowDomRef.childNodes.item(focusUnitIndexInRow);

    console.dir(unitDom);
    console.log(unitDom.offsetLeft); // 计算text文本宽度 计算光标偏移left

    var textWidth = 0;
    currentUnitData.text.split('').forEach(function (value) {
      textWidth += _this.characterWidth;
    });
    _this.cursorData.left = unitDom.offsetLeft + textWidth;
    console.log('spliceUnitToList', _this.focusUnitIndexInRow, _this.focusChaIndexInUnit, _this.editUnitListData);
  }, 0);
};

DataController.prototype.resetArrowKeyStartIndex = function () {
  this.arrowKeyStartFocusUnitIndexInRow = null;
}; // 插入字符数据到行数据 数值操作,并且更新光标位置


DataController.prototype.editTxtInRow = function (_ref3) {
  var _this2 = this;

  var isAddTxt = _ref3.isAddTxt,
      newTxt = _ref3.newTxt;
  this.resetArrowKeyStartIndex();
  setTimeout(function () {
    console.log('editTxtInRow', _this2.focusUnitIndexInRow, _this2.focusChaIndexInUnit, _this2.editUnitListData); // 添加

    if (isAddTxt) {
      _this2.addTxt({
        newTxt: newTxt
      });
    } else {
      // 删除
      _this2.deleteTxt();
    }
  }, 0);
};

DataController.prototype.updateCharacterLengthData = function (spliceParams) {
  var _this$unitInRowLength;

  (_this$unitInRowLength = this.unitInRowLengthList).splice.apply(_this$unitInRowLength, [spliceParams[0], spliceParams[1], spliceParams[2].text.length]); // data.text.split('').forEach((value, indexr) => {
  //   console.log(value);
  // });


  console.log(this.unitInRowLengthList);
};

DataController.prototype.initTemporaryInsertIndex = function () {
  this.temporaryInsertIndex = null;
};

DataController.prototype.clearCurrentDragData = function () {
  console.log('执行 clearCurrentDragData', this.editUnitListData); // this.initTemporaryInsertIndex();

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
}; // 设置鼠标开始移动时的 数据


DataController.prototype.setStartMoveData = function () {
  console.log('setStartMoveData', this.focusUnitIndexInRow, this.focusChaIndexInUnit);
  this.startMoveData.cursorLeft = this.cursorData.left;
  this.startMoveData.cursorTop = this.cursorData.top;
  this.startMoveData.focusUnitIndexInRow = this.focusUnitIndexInRow;
  this.startMoveData.focusChaIndexInUnit = this.focusChaIndexInUnit;
}; // 选中移动相关:


DataController.prototype.setStartMouseDownPosition = function (e, focusRowIndex) {
  this.startMoveData.clientX = e.clientX;
  this.startMoveData.clientY = e.clientY;
  this.startMoveData.focusRowIndex = focusRowIndex;
}; // 聚焦行末尾


DataController.prototype.focusEndRow = function (index) {
  console.log('focusEndRow');
  var unitDom = this.rowDomRefs[index].lastChild;
  this.cursorData.top = 25 * index;
  this.focusRowIndex = index;

  if (unitDom) {
    // 如果这一行有数据
    var left = unitDom.offsetLeft + unitDom.offsetWidth;
    this.cursorData.left = left;
    this.focusUnitIndexInRow = this.textData[index].length - 1;
    this.focusChaIndexInUnit = this.textData[index][this.focusUnitIndexInRow].text.length - 1;
  } else {
    // 如果这一行没有数据
    this.cursorData.left = this.editLetPadding;
    this.focusUnitIndexInRow = -1;
    this.focusChaIndexInUnit = -1;
  }

  this.setStartMoveData();
};

DataController.prototype.initSelectLine = function () {
  this.selectArea = [];
};

DataController.prototype.initFocus = function () {
  this.cursorData = {
    left: this.editLetPadding,
    top: 0
  };
  this.focusTextarea();
};

DataController.prototype.focusTextarea = function () {
  this.inputTexareaDom.focus();
}; // 根据屏幕点 定焦文字单元


DataController.prototype.focusUnit = function (_ref4) {
  var _this3 = this;

  var focusUnitIndexInRow = _ref4.focusUnitIndexInRow,
      focusRowIndex = _ref4.focusRowIndex,
      unitRect = _ref4.unitRect,
      compareParameter = _ref4.compareParameter,
      isFocus = _ref4.isFocus;
  var left = unitRect.left;
  var focusChaIndexInUnit = null;
  this.focusRowIndex = focusRowIndex;
  var unitData = this.textData[focusRowIndex][focusUnitIndexInRow]; // console.log('focusUnit', focusUnitIndexInRow, compareParameter);

  unitData.text.split('').every(function (value, index) {
    // 位置在当前字符偏左
    // console.log('遍历', value, '索引', index);
    if (compareParameter <= left + _this3.characterWidth / 2) {
      if (index === 0) {
        // 在unit第一个字符偏左，实际应该focus到上一个unit最后一个字符
        focusUnitIndexInRow -= 1;

        if (focusUnitIndexInRow >= 0) {
          focusChaIndexInUnit = _this3.textData[focusRowIndex][focusUnitIndexInRow].text.length - 1;
        }
      } else {
        focusChaIndexInUnit = index - 1;
      }

      _this3.cursorData.top = focusRowIndex * 25;
      _this3.cursorData.left = left - _this3.editWrapRect.left;
      return false;
    } // 位置在当前字符偏右


    if (compareParameter <= left + _this3.characterWidth) {
      left += _this3.characterWidth;
      focusChaIndexInUnit = index;
      _this3.cursorData.top = focusRowIndex * 25;
      _this3.cursorData.left = left - _this3.editWrapRect.left;
      return false;
    }

    left += _this3.characterWidth;
    return true;
  });
  this.focusUnitIndexInRow = focusUnitIndexInRow;
  this.focusChaIndexInUnit = focusChaIndexInUnit;

  if (isFocus) {
    this.setStartMoveData();
    this.initSelectLine();
  }
}; // 获取某个unit 的 rect


DataController.prototype.getUnitRect = function (focusRowIndex, focusUnitIndexInRow) {
  var rowChildNodes = this.rowDomRefs[focusRowIndex].childNodes;
  return rowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
}; // 根据字符index 定焦文字单元


DataController.prototype.focusUnitByIndex = function (focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit) {
  var _this4 = this;

  console.log('focusUnitByIndex', focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit);

  var _this$getUnitRect = this.getUnitRect(focusRowIndex, focusUnitIndexInRow),
      left = _this$getUnitRect.left;

  var unitData = this.textData[focusRowIndex][focusUnitIndexInRow];
  unitData.text.split('').every(function (value, index) {
    if (index > focusChaIndexInUnit) {
      return false;
    }

    left += _this4.characterWidth;
    _this4.cursorData.top = focusRowIndex * 25;
    _this4.cursorData.left = left - _this4.editWrapRect.left;
    return true;
  });
};

DataController.prototype.getIsMouseMoving = function (e) {
  var eClientX = e.clientX;
  var eClientY = e.clientY;
  var oClientX = this.startMoveData.clientX;
  var oClientY = this.startMoveData.clientY;
  this.isMouseMoving = oClientX && (eClientX !== oClientX || eClientY !== oClientY);
  return this.isMouseMoving;
};

DataController.prototype.onUnitMouseDown = function (focusUnitIndexInRow, focusRowIndex, unitRect, e) {
  console.log('onUnitMouseDown');
  this.setStartMouseDownPosition(e, focusRowIndex);
  this.focusUnit({
    focusUnitIndexInRow: focusUnitIndexInRow,
    focusRowIndex: focusRowIndex,
    unitRect: unitRect,
    compareParameter: e.clientX,
    isFocus: true
  });
}; // 鼠标移过unit单元


DataController.prototype.onUnitMouseOver = function (focusUnitIndexInRow, focusRowIndex, unitRect, e) {
  var _this5 = this;

  console.log('onUnitMouseOver');

  if (this.getIsMouseMoving(e)) {
    // 移动中聚焦光标到移动到的unit
    this.focusUnit({
      focusUnitIndexInRow: focusUnitIndexInRow,
      focusRowIndex: focusRowIndex,
      unitRect: unitRect,
      compareParameter: e.clientX,
      isFocus: false
    });
    var startRowIndex = this.startMoveData.focusRowIndex;
    var rowClientRect = this.rowDomRefs[startRowIndex].getBoundingClientRect();
    var selectArea = []; // 获取某一行的最后一个unit的 clientrect

    var getLastUnitRectInRow = function getLastUnitRectInRow(rowIndex) {
      var lastRowChildNodes = _this5.rowDomRefs[rowIndex].childNodes;
      return lastRowChildNodes[lastRowChildNodes.length - 1].getBoundingClientRect();
    }; // 计算中间选中行的覆盖层


    var setCenterSelectData = function setCenterSelectData(highIndex, lowIndex) {
      var disRow = highIndex - lowIndex;

      if (disRow > 1) {
        var countRowIndex = lowIndex + 1;

        while (countRowIndex < highIndex) {
          selectArea.push({
            left: 0,
            width: _this5.rowDomRefs[countRowIndex].lastChild.getBoundingClientRect().right - _this5.editWrapRect.left,
            top: countRowIndex * 25
          });
          countRowIndex += 1;
        }
      }
    };

    var startCursorLeft = this.startMoveData.cursorLeft;

    if (e.clientY <= rowClientRect.top) {
      // 向上选中
      var lastUnitRect = getLastUnitRectInRow(focusRowIndex); // 开始选中行

      selectArea.push({
        left: 0,
        width: startCursorLeft,
        top: startRowIndex * 25
      }); // 结尾选中行 首行鼠标浮过的一行 选中区域

      selectArea.push({
        left: this.cursorData.left,
        width: lastUnitRect.right - this.editWrapRect.left - this.cursorData.left,
        top: focusRowIndex * 25
      }); // 中间默认选中全行的区域

      setCenterSelectData(startRowIndex, focusRowIndex);
    } else if (e.clientY > rowClientRect.bottom) {
      // 向下选中
      // 开始选中行
      var _lastUnitRect = getLastUnitRectInRow(startRowIndex);

      selectArea.push({
        left: startCursorLeft,
        width: _lastUnitRect.right - this.editWrapRect.left - startCursorLeft,
        top: startRowIndex * 25
      }); // 结尾选中行 首行鼠标浮过的一行 选中区域

      selectArea.push({
        left: 0,
        width: this.cursorData.left,
        top: focusRowIndex * 25
      }); // 中间默认选中全行的区域

      setCenterSelectData(focusRowIndex, startRowIndex);
    } else if (e.clientX < startCursorLeft + this.editWrapRect.left) {
      // 鼠标在当前行左侧移动
      selectArea = [{
        left: this.cursorData.left,
        width: startCursorLeft - this.cursorData.left,
        top: this.startMoveData.cursorTop
      }];
    } else {
      // 鼠标在当前行右侧移动
      selectArea = [{
        left: startCursorLeft,
        width: this.cursorData.left - startCursorLeft,
        top: startRowIndex * 25
      }];
    }

    this.selectArea = selectArea;
  }
};

DataController.prototype.onUnitMouseUp = function (focusUnitIndexInRow, focusRowIndex, unitRect, e) {
  console.log('onUnitMouseUp');
  this.startMoveData.clientX = null;
  this.focusTextarea(); // this.initSelectLine();
};

DataController.prototype.onRowMouseOver = function (_ref5) {
  objectDestructuringEmpty_default()(_ref5);
};

DataController.prototype.onRowMouseDown = function (e, focusRowIndex) {
  console.log('RowMouseDown');
  this.setStartMouseDownPosition(e, focusRowIndex);
  this.initSelectLine();

  if (this.cursorData.left < 0) {
    // 页面初始化无聚焦
    this.initFocus();
  } else {
    // 已经有旧的聚焦
    this.focusEndRow(focusRowIndex);
  }
};

DataController.prototype.onRowMouseUp = function (e, rowIndex) {
  console.log('onRowMouseUp');
  this.startMoveData.clientX = null;
  this.focusTextarea();
}; // 输入时  添加文字 语法解析


DataController.prototype.onIputNewTxt = function (txt) {
  this.editTxtInRow({
    newTxt: txt,
    isAddTxt: true
  });
}; // 获取单个字符单元的类型


var getUnitType = function getUnitType(txt) {
  var txtType = null;

  if (/^\d+$/.test(txt)) {
    txtType = 'number';
  } else if (/[+|\-|*|/|>|<|=|(|)|{|}|[|\]|.|;]/.test(txt)) {
    txtType = 'operator';
  } else if (/^\w+$/.test(txt)) {
    if (['if', 'else', 'function', 'SELECT', 'DISTINCT', 'FROM', 'AS', 'ON', 'INNER', 'JOIN', 'LEFT', 'WHERE', 'IS', 'NOT', 'NULL', 'ORDER', 'BY', 'PARTITION', 'over', 'DESC', 'type', 'this', 'const'].includes(txt)) {
      txtType = 'keyword';
    } else {
      txtType = 'variable_use';
    }
  } else if (/^[ |\t]+$/.test(txt)) {
    txtType = 'space';
  } else if (/^[\r|\n]$/.test(txt)) {
    txtType = 'breakline';
  }

  return txtType;
};

DataController.prototype.deleteTxt = function () {
  var _this6 = this;

  this.cursorData.left -= this.characterWidth;
  var rowData = this.textData[this.focusRowIndex];
  console.log('deleteTxt前', this.focusUnitIndexInRow, this.focusChaIndexInUnit); // 光标到达行开头

  var data = copy_default.a.deepCopy(rowData[this.focusUnitIndexInRow]);
  var arr = data.text.split('');

  var replaceUnit = function replaceUnit() {
    arr.splice(_this6.focusChaIndexInUnit, 1);
    var newText = arr.join('');
    data.text = newText;
    data.type = getUnitType(newText);
    rowData.splice(_this6.focusUnitIndexInRow, 1, data);
  };

  var reduceCount = function reduceCount() {
    _this6.focusUnitIndexInRow -= 1;
    _this6.focusChaIndexInUnit = rowData[_this6.focusUnitIndexInRow].text.length - 1;
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
          var lastUnitData = rowData[this.focusUnitIndexInRow - 1];
          var lastLength = lastUnitData.text.length - 1;
          var newText = "".concat(lastUnitData.text).concat(rowData[this.focusUnitIndexInRow + 1].text);
          var newType = getUnitType(newText);
          console.log(newText, newType); // 如果当前被删除的剩余1长度的unit text + 上一个text 生成一个有效text

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
  } else {
    replaceUnit();
    this.focusChaIndexInUnit -= 1;
  }

  console.log('deleteTxt后', this.focusUnitIndexInRow, this.focusChaIndexInUnit);
}; // 解析字符串生成 unit数组,并更新对应光标，以及私有属性


DataController.prototype.parseStrToUnitArr = function (_ref6) {
  var _this7 = this;

  var lastUnitData = _ref6.lastUnitData,
      nextUnitData = _ref6.nextUnitData,
      txt = _ref6.txt;
  var unitArr = [];
  var focusRowIndex = this.focusRowIndex,
      focusChaIndexInUnit = this.focusChaIndexInUnit,
      focusUnitIndexInRow = this.focusUnitIndexInRow;
  var cursorLeft = this.cursorData.left;
  txt = txt.replace(/\r\n/g, '\r'); // windows换行转换为 单个换行

  txt = txt.replace(/\t/g, ' '); // 水平制表符转换为空格

  var txtArr = txt.split('');
  var type = getUnitType(txtArr[0]);
  var newTxt = null;
  var rowArr = [];
  console.log('txtArr', txt, txtArr, unitArr);
  txtArr.forEach(function (value, index) {
    type = getUnitType(value); // console.log('当前解析', value, value.charCodeAt(0).toString(16), type);

    if (type) {
      if (lastUnitData) {
        if (type === 'breakline') {
          rowArr.push(unitArr);
          lastUnitData = null;
          focusRowIndex += 1;

          _this7.lineNumList.push(_this7.lineNumList.length + 1);

          cursorLeft = _this7.editLetPadding;
          focusUnitIndexInRow = -1;
          focusChaIndexInUnit = -1;
          unitArr = [];
        } else {
          cursorLeft += _this7.characterWidth;

          if (lastUnitData.type === 'space' && type === 'space') {
            // 如果上一个是空 当前字符也是空，则把当前字符合并到上一个unittext
            focusChaIndexInUnit += 1;
            lastUnitData.text = "".concat(lastUnitData.text).concat(value);
          } else if (lastUnitData.type === 'space' || type === 'space') {
            // 如果上一个是空 当前字符不是空 新增unit
            focusUnitIndexInRow += 1;
            focusChaIndexInUnit = 0;
            var newUnitData = {
              type: type,
              text: value
            };
            lastUnitData = newUnitData;
            unitArr.push(newUnitData);
          } else {
            // 如果上一个 和 当前都不是 空
            focusChaIndexInUnit += 1;
            newTxt = "".concat(lastUnitData.text).concat(value);
            lastUnitData.text = newTxt;
            lastUnitData.type = getUnitType(newTxt);
          }
        }
      } else {
        var _newUnitData = {
          type: type,
          text: value
        };
        lastUnitData = _newUnitData;
        unitArr.push(_newUnitData);
        focusUnitIndexInRow += 1;
        focusChaIndexInUnit = 0;
        cursorLeft += _this7.characterWidth;
      }
    }
  }); // 如果有下一个unit数据，解析直接改动下一个unit的txt

  if (unitArr.length > 0 && nextUnitData) {
    var endResUnit = unitArr[unitArr.length - 1];

    if (nextUnitData.type !== 'space' && endResUnit.type !== 'space') {
      newTxt = "".concat(endResUnit.text).concat(nextUnitData.text);
      nextUnitData.text = newTxt;
      nextUnitData.type = getUnitType(newTxt);
      unitArr.splice(-1, 1);
    }
  }

  rowArr.push(unitArr);
  this.cursorData.left = cursorLeft;
  this.cursorData.top = 25 * focusRowIndex;
  this.focusRowIndex = focusRowIndex;
  this.focusUnitIndexInRow = focusUnitIndexInRow;
  this.focusChaIndexInUnit = focusChaIndexInUnit; // 返回unitarr 是单纯不算头部，尾部的中间部分

  console.log(rowArr);
  return rowArr;
}; // 添加单个字符


DataController.prototype.addTxt = function (_ref7) {
  var _this8 = this;

  var newTxt = _ref7.newTxt;
  console.log('addTxt', this.focusUnitIndexInRow, this.focusChaIndexInUnit, this.editUnitListData);
  var rowData = this.textData[this.focusRowIndex];
  var txtType = getUnitType(newTxt);
  var data = {
    type: txtType
  };

  var newAppend = function newAppend() {
    _this8.focusChaIndexInUnit = 0;

    if (_this8.focusUnitIndexInRow === null) {
      _this8.focusUnitIndexInRow = 0;
    } else {
      _this8.focusUnitIndexInRow += 1;
    }

    data.text = newTxt;
    rowData.splice(_this8.focusUnitIndexInRow, 1, data);
  };

  if (this.focusUnitIndexInRow === null) {
    // 初始化无数据
    newAppend();
  } else if (this.focusUnitIndexInRow === -1) {
    // 在行头部插入数据
    data.text = newTxt;
    rowData.splice(0, 0, data);
    this.focusUnitIndexInRow = 0;
    this.focusChaIndexInUnit = 0;
  } else {
    // 在行中间或者尾部插入数据
    var lastUnitData = rowData[this.focusUnitIndexInRow];
    var lastText = lastUnitData.text;
    var lastTextHead = lastText.slice(0, this.focusChaIndexInUnit + 1);
    var lastTextTail = lastText.slice(this.focusChaIndexInUnit + 1);
    var lastTxtType = lastUnitData.type;
    var isHasNextUnit = this.focusUnitIndexInRow < rowData.length - 1;
    var nextUnitData = null;
    var nextTxt = null;
    var nextUnitType = null;

    if (isHasNextUnit) {
      nextUnitData = rowData[this.focusUnitIndexInRow + 1];
      nextTxt = nextUnitData.text;
      nextUnitType = nextUnitData.type;
    } // 分割 插入 生成3段新的unit


    var splitToThreeUnit = function splitToThreeUnit() {
      rowData.splice(_this8.focusUnitIndexInRow, 1, {
        text: lastTextHead,
        type: getUnitType(lastTextHead)
      }, {
        text: newTxt,
        type: txtType
      }, {
        text: lastTextTail,
        type: getUnitType(lastTextTail)
      });
      _this8.focusUnitIndexInRow += 1;
      _this8.focusChaIndexInUnit = 0;
    };

    if ( // 先判断位置：如果是在行末尾添加
    this.focusUnitIndexInRow === rowData.length - 1 && this.focusChaIndexInUnit === rowData[this.focusUnitIndexInRow].text.length - 1) {
      console.log('是在行末尾添加');

      if (lastTxtType === 'space' && txtType === 'space' || lastTxtType !== 'space' && txtType !== 'space') {
        var resTxt = "".concat(lastText).concat(newTxt);
        this.focusChaIndexInUnit += 1;
        rowData.splice(this.focusUnitIndexInRow, 1, {
          text: resTxt,
          type: getUnitType(resTxt)
        });
      } else {
        newAppend();
      }
    } else {
      // 如果不是在末尾添加
      if (lastTxtType === 'space') {
        // 上一个类型是 space
        console.log('上一个类型是 space');

        if (txtType === 'space') {
          // 当前输入的是space
          console.log('当前输入的是space');

          var _resTxt = "".concat(lastText).concat(newTxt);

          this.focusChaIndexInUnit += 1;
          rowData.splice(this.focusUnitIndexInRow, 1, {
            text: _resTxt,
            type: 'space'
          });
        } else if (lastText.length - 1 > this.focusChaIndexInUnit) {
          // 当前输入的不是空 在空格间插入
          splitToThreeUnit();
        } else {
          // 当前输入的不是space
          console.log('当前输入的不是space'); // 把当前txt 和下一个unit txt合并

          var _resTxt2 = "".concat(newTxt).concat(nextTxt);

          this.focusUnitIndexInRow += 1;
          this.focusChaIndexInUnit = 0;
          rowData.splice(this.focusUnitIndexInRow, 1, {
            text: _resTxt2,
            type: getUnitType(_resTxt2)
          });
        }
      } else {
        // 上一个类型不是 space
        console.log('上一个类型不是space');

        if (txtType === 'space') {
          // 输入空格时 分割字符为 3段，中间一段为空
          splitToThreeUnit();
        } else {
          // 输入非空格
          var _resTxt3 = "".concat(lastTextHead).concat(newTxt).concat(lastTextTail);

          this.focusChaIndexInUnit += 1;
          rowData.splice(this.focusUnitIndexInRow, 1, {
            text: _resTxt3,
            type: getUnitType(_resTxt3)
          });
        }
      }
    }
  }

  this.cursorData.left += this.characterWidth;
}; // 添加字符串


DataController.prototype.addTxts = function (_ref8) {
  var newTxt = _ref8.newTxt;
  var focusRowIndex = this.focusRowIndex,
      focusUnitIndexInRow = this.focusUnitIndexInRow,
      focusChaIndexInUnit = this.focusChaIndexInUnit;
  var copyRowData = this.parseStrToUnitArr({
    txt: newTxt
  });
  console.log(copyRowData);
  this.insertUnitArr(copyRowData, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit);
}; //
// 删除文本操作


DataController.prototype.deleteCharacter = function () {
  console.log('deleteCharacter', this.focusUnitIndexInRow, this.focusChaIndexInUnit);

  if (this.focusUnitIndexInRow === -1 && this.focusRowIndex > 0) {
    // 光标到最左端
    // 需要添加 如果不是第一行判断，把本行的数据添加到上一行末尾
    // 需要添加 删除两行之间衔接的字符串类型判断
    console.log('光标到最左端', this.focusRowIndex);
    var rowData = copy_default.a.deepCopy(this.textData[this.focusRowIndex]);
    var lastRowData = copy_default.a.deepCopy(this.textData[this.focusRowIndex - 1]);

    if (lastRowData.length > 0) {
      // 如果上一行不是空行
      var lastUnit = lastRowData[lastRowData.length - 1];

      if (rowData.length > 0) {
        var firstUnit = rowData[0];

        if (firstUnit.type === lastUnit.type) {
          this.focusChaIndexInUnit = lastUnit.text.length - 1;
          lastUnit.text = "".concat(lastUnit.text).concat(firstUnit.text);
          rowData.splice(0, 1);
        }

        this.textData.splice(this.focusRowIndex - 1, 2, lastRowData.concat(rowData));
      } else {
        this.focusChaIndexInUnit = lastUnit.text.length - 1;
      } // 这段计算left 需要改为用rect


      var unitDom = this.rowDomRefs[this.focusRowIndex - 1].lastChild;
      this.cursorData.left = unitDom.offsetLeft + unitDom.offsetWidth;
      this.cursorData.top -= 25;
      this.focusUnitIndexInRow = lastRowData.length - 1;
    } else {
      // 上一行是空行
      this.focusChaIndexInUnit = -1;

      if (rowData.length > 0) {
        this.textData.splice(this.focusRowIndex - 1, 2, rowData);
      } // 这段计算left 需要改为用rect


      this.cursorData.left = this.editLetPadding;
      this.cursorData.top -= 25;
      this.focusUnitIndexInRow = -1;
    }

    this.focusRowIndex -= 1;
    this.lineNumList.pop();
    console.log(this.textData);
  } else if (this.focusUnitIndexInRow >= 0) {
    this.editTxtInRow({
      isAddTxt: false
    });
  }
}; // 回车


DataController.prototype.onEnterClick = function () {
  var _this9 = this;

  console.log('onEnterClick', this.textData, this.focusUnitIndexInRow, this.focusChaIndexInUnit);

  var newRow = function newRow() {
    _this9.lineNumList.push(_this9.lineNumList.length + 1);

    _this9.focusUnitIndexInRow = -1;
    _this9.focusChaIndexInUnit = null;
    _this9.cursorData.top += 25;
    _this9.cursorData.left = _this9.editLetPadding;
  };

  if (this.focusUnitIndexInRow === -1) {
    // 行头部   回车 新增行
    var rowData = this.textData[this.focusRowIndex];
    this.textData.splice(this.focusRowIndex, 1, [], rowData);
    this.focusRowIndex += 1;
    newRow();
  } else if (this.focusUnitIndexInRow === this.textData[this.focusRowIndex].length - 1 && this.focusChaIndexInUnit === this.textData[this.focusRowIndex][this.focusUnitIndexInRow].text.length - 1) {
    // 在行末尾按下回车
    this.focusRowIndex += 1;
    this.textData.splice(this.focusRowIndex, 0, []);
    newRow();
  } else {
    // 在行中间按下回车
    this.breakRow();
  }
}; // 回车


DataController.prototype.breakRow = function () {
  console.log('breakRow');

  if (this.focusUnitIndexInRow === -1) {
    this.focusUnitIndexInRow = 0;
  }

  var rowData = this.textData[this.focusRowIndex];
  var unitData = rowData[this.focusUnitIndexInRow];
  var unitCharacterArr = unitData.text.split('');
  var newRowHeadTxtArr = unitCharacterArr.splice(this.focusChaIndexInUnit + 1);
  unitData.text = unitCharacterArr.join('');
  unitData.type = getUnitType(unitData.text);
  var newRowTailArr = rowData.splice(this.focusUnitIndexInRow + 1);
  var txt = newRowHeadTxtArr.join('');
  var newRowHeadData = {
    type: getUnitType(txt),
    text: txt
  };
  var newRowArr = [newRowHeadData].concat(toConsumableArray_default()(newRowTailArr));
  this.textData.splice(this.focusRowIndex + 1, 0, newRowArr);
  this.focusRowIndex += 1;
  this.lineNumList.push(this.lineNumList.length + 1);
  this.cursorData.top += 25;
  this.cursorData.left = this.editLetPadding;
  this.focusUnitIndexInRow = -1;
  this.focusChaIndexInUnit = -1;
  console.log('breakRow', this.textData, newRowArr);
}; // 按向左箭头


DataController.prototype.cursorMoveLeft = function () {
  var _this10 = this;

  this.resetArrowKeyStartIndex();

  var moveLeftCursor = function moveLeftCursor() {
    _this10.cursorData.left -= _this10.characterWidth;
  };

  if (this.focusChaIndexInUnit > 0) {
    this.focusChaIndexInUnit -= 1;
    moveLeftCursor();
  } else if (this.focusUnitIndexInRow > 0) {
    this.focusUnitIndexInRow -= 1;
    this.focusChaIndexInUnit = this.textData[this.focusRowIndex][this.focusUnitIndexInRow].text.length - 1;
    moveLeftCursor();
  } else if (this.focusUnitIndexInRow === 0) {
    this.focusUnitIndexInRow = -1;
    this.focusChaIndexInUnit = -1;
    moveLeftCursor();
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
  var focusUnitIndexInRow = null;
  var compareLeft = null;

  if (this.arrowKeyStartFocusUnitIndexInRow === null) {
    focusUnitIndexInRow = this.focusUnitIndexInRow;
    this.arrowKeyStartFocusUnitIndexInRow = focusUnitIndexInRow;
    compareLeft = this.cursorData.left + this.editWrapRect.left;
    this.arrowKeyStartCompareLeft = compareLeft;
  } else {
    compareLeft = this.arrowKeyStartCompareLeft;
    focusUnitIndexInRow = this.arrowKeyStartFocusUnitIndexInRow;
  }

  console.log(focusUnitIndexInRow, compareLeft);
  return {
    focusUnitIndexInRow: focusUnitIndexInRow,
    compareLeft: compareLeft
  };
};

DataController.prototype.cursorMoveCalculatePosition = function (focusUnitIndexInRow, compareLeft) {
  var nextRowChildNodes = this.rowDomRefs[this.focusRowIndex].childNodes;
  var nextRowData = this.textData[this.focusRowIndex];

  if (nextRowData.length > focusUnitIndexInRow) {
    var unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect(); // '下一行长度大于unit索引';

    var isFocusEnd = false;

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
        focusUnitIndexInRow: focusUnitIndexInRow,
        focusRowIndex: this.focusRowIndex,
        unitRect: unitRect,
        compareParameter: compareLeft,
        isFocus: false
      });
    }
  } else {
    // '下一行长度小于等于unit索引';
    // 判断下一行是否有数据
    focusUnitIndexInRow = nextRowData.length - 1;

    if (nextRowData.length > 0) {
      var _unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect();

      if (compareLeft <= _unitRect.right) {
        while (!(compareLeft > _unitRect.left && compareLeft < _unitRect.right)) {
          focusUnitIndexInRow -= 1;
          _unitRect = nextRowChildNodes[focusUnitIndexInRow].getBoundingClientRect();
        }

        this.focusUnit({
          focusUnitIndexInRow: focusUnitIndexInRow,
          focusRowIndex: this.focusRowIndex,
          unitRect: _unitRect,
          compareParameter: compareLeft,
          isFocus: false
        });
      } else {
        this.focusEndRow(this.focusRowIndex);
      }
    } else {
      this.focusEndRow(this.focusRowIndex);
    }
  }
}; // 按向上箭头


DataController.prototype.cursorMoveUp = function () {
  // 上一行有数据
  if (this.focusRowIndex > 0) {
    var _this$getArrowStartDa = this.getArrowStartData(),
        focusUnitIndexInRow = _this$getArrowStartDa.focusUnitIndexInRow,
        compareLeft = _this$getArrowStartDa.compareLeft;

    this.focusRowIndex -= 1;

    if (focusUnitIndexInRow === -1) {
      this.cursorData.top -= 25;
    } else {
      this.cursorMoveCalculatePosition(focusUnitIndexInRow, compareLeft);
    }
  }
}; // 按向下箭头


DataController.prototype.cursorMoveDown = function () {
  // 下一行有数据
  if (this.textData[this.focusRowIndex + 1]) {
    var _this$getArrowStartDa2 = this.getArrowStartData(),
        focusUnitIndexInRow = _this$getArrowStartDa2.focusUnitIndexInRow,
        compareLeft = _this$getArrowStartDa2.compareLeft;

    this.focusRowIndex += 1;

    if (focusUnitIndexInRow === -1) {
      this.cursorData.top += 25;
    } else {
      this.cursorMoveCalculatePosition(focusUnitIndexInRow, compareLeft);
    }
  }
}; // 向下移动一行


DataController.prototype.moveToNextRow = function () {
  if (this.textData[this.focusRowIndex + 1]) {
    this.cursorData.left = this.editLetPadding;
    this.cursorData.top += 25;
    this.focusRowIndex += 1;
    this.focusChaIndexInUnit = -1;
    this.focusUnitIndexInRow = -1;
  }
};

DataController.prototype.cursorMoveRight = function () {
  var _this11 = this;

  console.log(this.focusRowIndex, this.focusUnitIndexInRow);
  this.resetArrowKeyStartIndex();

  var toNextUnit = function toNextUnit() {
    // 移动到下一个unit
    _this11.focusUnitIndexInRow += 1;
    _this11.focusChaIndexInUnit = 0;
    _this11.cursorData.left += _this11.characterWidth;
  };

  var toNextCharactor = function toNextCharactor() {
    // 当前unit内移动一个字符
    _this11.focusChaIndexInUnit += 1;
    _this11.cursorData.left += _this11.characterWidth;
  };

  if (this.focusUnitIndexInRow === -1) {
    if (this.textData[this.focusRowIndex].length > 0) {
      toNextUnit();
    } else if (this.focusRowIndex < this.textData.length - 1) {
      this.moveToNextRow();
    }
  } else if (this.focusChaIndexInUnit < this.textData[this.focusRowIndex][this.focusUnitIndexInRow].text.length - 1) {
    toNextCharactor();
  } else if (this.focusUnitIndexInRow < this.textData[this.focusRowIndex].length - 1) {
    toNextUnit();
  } else {
    this.moveToNextRow();
  }
}; // 复制


DataController.prototype.copy = function (e) {
  var _this12 = this;

  var _this$startMoveData = this.startMoveData,
      focusRowIndex = _this$startMoveData.focusRowIndex,
      focusUnitIndexInRow = _this$startMoveData.focusUnitIndexInRow,
      focusChaIndexInUnit = _this$startMoveData.focusChaIndexInUnit;
  var tFocusRowIndex = this.focusRowIndex;
  var tFocusUnitIndexInRow = this.focusUnitIndexInRow;
  var tFocusChaIndexInUnit = this.focusChaIndexInUnit;
  var resUnitArr = [];
  var resRowArr = [];
  var startUnit = this.textData[focusRowIndex][focusUnitIndexInRow];
  var startText = startUnit.text;
  var endUnit = this.textData[tFocusRowIndex][tFocusUnitIndexInRow];
  var endText = endUnit.text;
  var txt = null;
  e.clipboardData.setData('text/plain', 'mazhiwenflag'); // 生成单行 选中数据的 方法

  var generateSingleRowData = function generateSingleRowData(pStartText, pEndText, pFocusRowIndex, // 头部focus参数
  pFocusUnitIndexInRow, pFocusChaIndexInUnit, pTFocusUnitIndexInRow, // 尾部focus参数
  pTFocusChaIndexInUnit) {
    var _resUnitArr;

    if (pFocusChaIndexInUnit < pStartText.length - 1) {
      txt = pStartText.slice(pFocusChaIndexInUnit + 1);
      resUnitArr.push({
        text: txt,
        type: getUnitType(txt)
      });
    }

    (_resUnitArr = resUnitArr).push.apply(_resUnitArr, toConsumableArray_default()(_this12.textData[pFocusRowIndex].slice(pFocusUnitIndexInRow + 1, pTFocusUnitIndexInRow)));

    txt = pEndText.slice(0, pTFocusChaIndexInUnit + 1);
    resUnitArr.push({
      text: txt,
      type: getUnitType(txt)
    });
    resRowArr.push(resUnitArr);
  }; // 生成多行 选中数据的 方法


  var generateMultiRowData = function generateMultiRowData(pStartText, pEndText, pFocusRowIndex, pFocusUnitIndexInRow, pFocusChaIndexInUnit, pTFocusRowIndex, pTFocusUnitIndexInRow, pTFocusChaIndexInUnit) {
    var _resUnitArr2, _resUnitArr3;

    txt = pStartText.slice(pFocusChaIndexInUnit + 1);
    resUnitArr.push({
      text: txt,
      type: getUnitType(txt)
    });

    (_resUnitArr2 = resUnitArr).push.apply(_resUnitArr2, toConsumableArray_default()(_this12.textData[pFocusRowIndex].slice(pFocusUnitIndexInRow + 1)));

    resRowArr.push(resUnitArr);
    resRowArr.push.apply(resRowArr, toConsumableArray_default()(_this12.textData.slice(pFocusRowIndex + 1, pTFocusRowIndex)));
    resUnitArr = [];

    (_resUnitArr3 = resUnitArr).push.apply(_resUnitArr3, toConsumableArray_default()(_this12.textData[pTFocusRowIndex].slice(0, pTFocusUnitIndexInRow)));

    txt = pEndText.slice(0, pTFocusChaIndexInUnit + 1);
    resUnitArr.push({
      text: txt,
      type: getUnitType(txt)
    });
    resRowArr.push(resUnitArr);
  };

  if (tFocusRowIndex > focusRowIndex) {
    // 向下行选中
    generateMultiRowData(startText, endText, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit, tFocusRowIndex, tFocusUnitIndexInRow, tFocusChaIndexInUnit);
  } else if (tFocusRowIndex < focusRowIndex) {
    // 向上行选中
    generateMultiRowData(endText, startText, tFocusRowIndex, tFocusUnitIndexInRow, tFocusChaIndexInUnit, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit);
  } else {
    // 在同一行
    if (tFocusUnitIndexInRow > focusUnitIndexInRow) {
      // 往右侧选中不同unit
      generateSingleRowData(startText, endText, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit, tFocusUnitIndexInRow, tFocusChaIndexInUnit);
    } else if (tFocusUnitIndexInRow < focusUnitIndexInRow) {
      // 往左侧选中不同unit
      console.log('往左侧选中不同unit起始参数', focusUnitIndexInRow, focusChaIndexInUnit);
      generateSingleRowData(endText, startText, focusRowIndex, tFocusUnitIndexInRow, tFocusChaIndexInUnit, focusUnitIndexInRow, focusChaIndexInUnit);
    } else {
      // 同一个unit
      if (tFocusChaIndexInUnit > focusChaIndexInUnit) {
        txt = startText.slice(focusChaIndexInUnit + 1, tFocusChaIndexInUnit + 1);
      } else {
        txt = startText.slice(tFocusChaIndexInUnit + 1, focusChaIndexInUnit + 1);
      }

      resUnitArr.push({
        text: txt,
        type: getUnitType(txt)
      });
      resRowArr.push(resUnitArr);
    }
  }

  console.log(resRowArr);
  this.copyRowData = resRowArr;
}; // 粘贴


DataController.prototype.paste = function (pasteTxt) {
  // 这里逻辑需要修改，为粘贴时候只读取粘贴板的string 并即时转换为unitarr。
  // 不需要记录之前的拷贝时候 直接拷贝的unitarr
  // 之前的拷贝操作额外需要 生成string 并写入到粘贴板
  var focusRowIndex = this.focusRowIndex,
      focusUnitIndexInRow = this.focusUnitIndexInRow,
      focusChaIndexInUnit = this.focusChaIndexInUnit;
  console.log('paste', focusUnitIndexInRow);
  var copyRowData;

  if (pasteTxt !== 'mazhiwenflag') {
    // 取粘贴板的文本
    copyRowData = this.parseStrToUnitArr({
      txt: pasteTxt
    });
  } else {
    // 粘贴本编辑器粘贴到的文本
    copyRowData = this.copyRowData;
  }

  this.insertUnitArr(copyRowData, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit);
}; // 两个unit合并 根据类型做 合并 还是 分离处理


var unitConnect = function unitConnect(unitAtype, unitBtype, combineFn, splitFn) {
  if (unitAtype === 'space' && unitBtype === 'space' || unitAtype !== 'space' && unitBtype !== 'space') {
    // 都不是空格或者都是空格
    combineFn();
  } else {
    // 被插入是空格 或者 粘贴板第一个是空格
    splitFn();
  }
}; // 插入一个unit 序列组到编辑器内 ,以当前focus为准


DataController.prototype.insertUnitArr = function (copyRowData, focusRowIndex, focusUnitIndexInRow, focusChaIndexInUnit) {
  var _this13 = this;

  var resUnitArr = [];
  var txt = null;
  var focusRow = this.textData[focusRowIndex];
  var focusRowLen = focusRow.length;
  var focusUnit = focusRow[focusUnitIndexInRow];
  var newFocusRowIndex = focusRowIndex;
  var newFocusUnitIndexInRow = focusUnitIndexInRow;
  var newFocusChaIndexInUnit = focusChaIndexInUnit;
  var unitTextHead = '';
  var unitTextTail = '';

  if (focusUnit) {
    var unitText = focusUnit.text;
    unitTextHead = unitText.slice(0, focusChaIndexInUnit + 1);
    unitTextTail = unitText.slice(focusChaIndexInUnit + 1);
  }

  var copyFirstRow = copyRowData[0];
  var copyFirstRowLen = copyFirstRow.length;
  var copyRowDataLen = copyRowData.length;
  var copyFirstUnit = copyFirstRow[0];
  var copyFirstUnitLen = copyFirstUnit.text.length;
  var copyLastRow = null;
  var copyLastUnit = null; // 处理第一个unit

  var handleFirstUnit = function handleFirstUnit(focusUnitIndexFn) {
    console.log('handlefirst', copyFirstUnit, focusUnit);

    if (focusUnit) {
      unitConnect(copyFirstUnit.type, focusUnit.type, function () {
        txt = "".concat(txt).concat(copyFirstUnit.text);
        resUnitArr.push({
          text: txt,
          type: getUnitType(txt)
        });
      }, function () {
        resUnitArr.push({
          text: txt,
          type: getUnitType(txt)
        }, copyFirstUnit);
        focusUnitIndexFn();
      });
    } else {
      resUnitArr.push(copyFirstUnit);
      focusUnitIndexFn();
    }

    console.log(JSON.stringify(resUnitArr));
  };

  var handleLastUnit = function handleLastUnit(focusUnitIndexFn) {
    var copyLastUnitText = copyLastUnit.text;

    if (focusUnit) {
      unitConnect(copyLastUnit.type, focusUnit.type, function () {
        txt = "".concat(copyLastUnitText).concat(unitTextTail);
        resUnitArr.push({
          text: txt,
          type: getUnitType(txt)
        });
      }, function () {
        resUnitArr.push(copyLastUnit);

        if (unitTextTail) {
          // 插入unit末尾时 值为空 ,判断不是末尾时处理
          resUnitArr.push({
            text: unitTextTail,
            type: getUnitType(unitTextTail)
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

  if (copyRowDataLen >= 2) {
    var _resUnitArr4, _this$textData$focusR, _resUnitArr5;

    // 粘贴板数据2行以上
    handleFirstUnit(); // 处理第一行剩下的unit

    (_resUnitArr4 = resUnitArr).push.apply(_resUnitArr4, toConsumableArray_default()(copyFirstRow.slice(1))); // 保留 当前focus行 尾部unit列


    var focusRowTail = this.textData[focusRowIndex].slice(focusUnitIndexInRow + 1, focusRowLen); // 插入新的第一行

    (_this$textData$focusR = this.textData[focusRowIndex]).splice.apply(_this$textData$focusR, [focusUnitIndexInRow, focusRowLen].concat(toConsumableArray_default()(resUnitArr))); // 处理第二行


    copyLastRow = copyRowData[copyRowDataLen - 1]; // 处理粘贴板第二行前面unit

    resUnitArr = copyLastRow.slice(0, -1);
    copyLastUnit = copyLastRow[copyLastRow.length - 1]; // 处理粘贴板第二行最后一个unit

    handleLastUnit(function () {
      newFocusUnitIndexInRow = copyLastRow.length - 1;
    }); // 处理当前focus行 尾部unit列

    (_resUnitArr5 = resUnitArr).push.apply(_resUnitArr5, toConsumableArray_default()(focusRowTail)); // 插入新生成的第二行


    if (copyRowDataLen > 2) {
      var _this$textData;

      // 粘贴板数据3行以上
      // 并且插入中间行
      (_this$textData = this.textData).splice.apply(_this$textData, [focusRowIndex + 1, 0].concat(toConsumableArray_default()(copyRowData.slice(1, -1)), [resUnitArr]));
    } else {
      // 粘贴板数据2行
      this.textData.splice(focusRowIndex + 1, 0, resUnitArr);
    }

    newFocusRowIndex += copyRowDataLen - 1;
    this.lineNumList.length = newFocusRowIndex + 1;
  } else {
    var _this$textData$focusR2;

    // 粘贴板数据共1行
    if (copyFirstRowLen >= 2) {
      var _resUnitArr6;

      // 如果粘贴板unit >= 2个
      handleFirstUnit(function () {
        newFocusUnitIndexInRow += 1;
      }); // 插入中间unit

      (_resUnitArr6 = resUnitArr).push.apply(_resUnitArr6, toConsumableArray_default()(copyFirstRow.slice(1, -1))); // 处理最后一个unit


      copyLastUnit = copyFirstRow[copyFirstRowLen - 1];
      handleLastUnit(function () {
        newFocusUnitIndexInRow += copyFirstRowLen - 1;
      });
    } else {
      // 粘贴板unit 1个
      if (focusUnit) {
        unitConnect(copyFirstUnit.type, focusUnit.type, function () {
          txt = "".concat(txt).concat(copyFirstUnit.text).concat(unitTextTail);
          resUnitArr.push({
            text: txt,
            type: getUnitType(txt)
          });
          newFocusChaIndexInUnit += copyFirstUnitLen;
        }, function () {
          resUnitArr.push({
            text: txt,
            type: getUnitType(txt)
          }, copyFirstUnit, {
            text: unitTextTail,
            type: getUnitType(unitTextTail)
          });
          newFocusUnitIndexInRow += 1;
          newFocusChaIndexInUnit = copyFirstUnitLen - 1;
        });
      } else {
        resUnitArr.push(copyFirstUnit);
        newFocusUnitIndexInRow += 1;
        newFocusChaIndexInUnit = copyFirstUnitLen - 1;
      }
    }

    (_this$textData$focusR2 = this.textData[focusRowIndex]).splice.apply(_this$textData$focusR2, [focusUnitIndexInRow, 1].concat(toConsumableArray_default()(resUnitArr)));
  }

  this.focusRowIndex = newFocusRowIndex;
  this.focusUnitIndexInRow = newFocusUnitIndexInRow;
  this.focusChaIndexInUnit = newFocusChaIndexInUnit;
  setTimeout(function () {
    _this13.focusUnitByIndex(newFocusRowIndex, newFocusUnitIndexInRow, newFocusChaIndexInUnit);
  }, 0);
};

/* harmony default export */ var EditorDataController = ({
  DataController: DataController
});
// CONCATENATED MODULE: ./src/packages/index.js




var components = [Menu, Edit];

var packages_install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  console.log('执行install');
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
  Vue.prototype.$dropMenu = Menu_DropMenu;
  Vue.prototype.$EditorDataController = EditorDataController;
}; // window挂载vue时 安装插件


if (typeof window !== 'undefined' && window.Vue) {
  packages_install(window.Vue);
}

/* harmony default export */ var src_packages = __webpack_exports__["default"] = ({
  version: 'fk',
  install: packages_install // EditorDataController,

});

/***/ })
/******/ ])["default"];