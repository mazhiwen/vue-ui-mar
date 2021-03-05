<template>
  <div
    ref="m_menu_wrap"
    class="m_menu_wrap"
  >
    <div
      ref="m_menu"
      class="m_menu first_row_wrap"
    >
      <MenuItem
        :data="parsedData"
        :is-root-level="true"
        :data-controller="menuDataControllerInstance"
      />
    </div>
    <div
      v-if="scrollData.length > 0"
      class="m_menu"
    >
      <el-button
        type="text"
        class="leftbtn"
        icon="el-icon-arrow-left"
        @click="scrollLeft"
      />
      <div
        ref="scroll_wrap"
        class="scroll_wrap"
      >
        <div
          ref="scroll_wrap_inner"
          class="scroll_wrap_inner first_row_wrap"
          :style="scrollStyle"
        >
          <MenuItem
            :start-index="scrollFromIndex"
            :data="scrollData"
            :is-root-level="true"
            :data-controller="menuDataControllerInstance"
          />
        </div>
      </div>
      <el-button
        type="text"
        class="rightbtn"
        icon="el-icon-arrow-right"
        @click="scrollRight"
      />
    </div>
  </div>
</template>

<script>
import { copy } from 'utility-mar';
import MenuItem from './MenuItem';
import menuDataWatcher from './menuDataWatcher';

console.log(copy);
const scrollStep = 150;

export default {
  name: 'MarMenu',
  components: {
    MenuItem,
  },
  filters: {},
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    index: [String, Number],
    scrollFromIndex: {
      type: Number,
      default: 1,
      validator(value) {
        // 最小是1,否则设置无效,会报错
        return value;
      },
    },
    defaultActive: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      scrollStyle: {
        left: '0px',
      },
      lastActiveIndex: '0',
      //* ******************注意！！！！！！！***************************
      // value 和 默认index格式 0-0-0 ,不可重复,需要全局唯一值
      // 因为初始化数据会生成 value-Index map表
      // 内部计算index先查找value-Index map表,
      // 查找到则按照当前传入值为value处理，否则按照index处理
      datas: [
        {
          label: '1aaaaa',
          childVisible: false,
          active: true,
          // data每个item 的value值如果设置了，点击事件回传的就是改值，
          // 如果没设置就回传默认的index索引序列
          value: 'ffff',
          children: [
            {
              label: '1_1',
            },
            {
              label: '1_2',
              childVisible: false,
              children: [
                {
                  label: '1_2_1',
                  childVisible: false,
                  children: [
                    {
                      label: '1_2_1_1',
                    },
                    {
                      label: '1_2_1_2',
                    },
                  ],
                },
                {
                  label: '1_2_2',
                },
              ],
            },
          ],
        },
        {
          label: '2级根标题级根标题级根标题级级根标根标题级',
          childVisible: false,
          children: [
            {
              label: '2_1',
              childVisible: false,
              children: [
                {
                  label: '2_1_1',
                  childVisible: false,
                  children: [
                    {
                      label: '2_1_1_1',
                    },
                    {
                      label: '2_1_1_2',
                    },
                  ],
                },
                {
                  label: '1_2_2',
                },
              ],
            },
          ],
        },
        {
          label: '3级根标题',
          childVisible: false,
          children: [
            {
              label: '3_1',
            },
          ],
        },
        {
          label: '4级根标题级根标题级根标题级级根标根标题级',
        },
        {
          label: '5级根标题级根标题级根标题级级根标根标题级',
        },
        {
          label: '6级根标题级根标题级根标题级级根标根标题级',
        },
        {
          label: '7级根标题级根标题级根标题级级根标根标题级',
        },
        {
          label: '8级根标题级根标题级根标题级级根标根标题级',
        },
      ],
      scrollData: [],
      parsedData: [],
      menuDataControllerInstance: null,
    };
  },
  computed: {},
  watch: {
    data(newV, oldV) {
      this.initData(newV);
    },
    defaultActive(newV, oldV) {
      // console.log("defaultActive 执行setactive",newV);
      // this.menuDataControllerInstance.setActive(newV);
      this.menuDataControllerInstance.setDefaultActive(newV);
    },
  },
  created() {

  },
  mounted() {
    this.menuDataControllerInstance = new menuDataWatcher.menuDataController({
      lastActiveIndex: this.defaultActive,
      scrollFromIndex: this.scrollFromIndex,
      onItemClickListenerHander: (value) => {
        this.$emit('onItemClick', value);
      },
    });
    this.initData(this.data);
  },
  beforeDestroy() {},
  methods: {
    initData(arr) {
      // console.log("执行initdata",arr);
      if (arr.length > 0) {
        const recurision = (data) => {
          data.forEach((value) => {
            value.active = false;
            if (value.children) {
              value.childVisible = false;
              recurision(value.children);
            }
          });
        };
        recurision(arr);
        this.parsedData = copy.deepCopy(this.data);

        this.$nextTick(() => {
          if (
            this.$refs.m_menu.offsetWidth
            > (this.$refs.m_menu_wrap.clientWidth + 1)
          ) {
            this.scrollData = this.parsedData.splice(this.scrollFromIndex);
          }
          this.menuDataControllerInstance.setMenuData({
            parsedData: this.parsedData,
            scrollData: this.scrollData,
          });
        });
      }
    },
    scrollRight() {
      // 外部固定宽度包裹dom
      const outerWidth = this.$refs.scroll_wrap.offsetWidth;
      // 内部内容长度
      const innerWidth = this.$refs.scroll_wrap_inner.offsetWidth;
      let offsetLeft = Math.abs(parseInt(this.scrollStyle.left));
      const maxOffsetLeft = innerWidth - outerWidth;
      if (offsetLeft < maxOffsetLeft) {
        if (maxOffsetLeft - offsetLeft < scrollStep) {
          offsetLeft = maxOffsetLeft;
        } else {
          offsetLeft += scrollStep;
        }
      } else {
        return;
      }
      this.scrollStyle.left = `-${offsetLeft}px`;
    },
    scrollLeft() {
      let offsetLeft = Math.abs(parseInt(this.scrollStyle.left));
      if (offsetLeft <= 0) return;
      offsetLeft = offsetLeft >= scrollStep ? offsetLeft - scrollStep : 0;
      this.scrollStyle.left = `-${offsetLeft}px`;
    },
  },
};
</script>
