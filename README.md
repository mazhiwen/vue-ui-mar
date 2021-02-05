# vue ui组件开发

## 问题记录

需要增加编译css功能
以及单独的编辑器组件npm发布
内置编辑器datacontro

## 安装使用

```sh
yarn add vue-ui-mar
```

```js
import MARUI from 'vue-ui-mar';
Vue.use(MARUI);
```

```html
<!-- 编辑器引用 -->
<MarEdit
  :data-controller="ruleDataController"
/>
```

## 参考elementui的内容

### elementui的build流程

```js
{
  "build:file": `
                node build/bin/iconInit.js &
                node build/bin/build-entry.js &
                node build/bin/i18n.js &
                node build/bin/version.js
                `,
  "dist": `
          npm run clean &&
          npm run build:file &&
          npm run lint &&
          webpack --config build/webpack.conf.js &&
          webpack --config build/webpack.common.js &&
          webpack --config build/webpack.component.js &&
          npm run build:utils &&
          npm run build:umd &&
          npm run build:theme
          `,
  // css生成
  "build:theme": "node build/bin/gen-cssfile && gulp build --gulpfile packages/theme-chalk/gulpfile.js && cp-cli packages/theme-chalk/lib lib/theme-chalk",

}

```

- build/bin/build-entry

通过模版生成src/index.js

## 编译发布

1. yarn dist 编译生成lib目录
1. 修改package.json版本  
1. npm login  marjoven  *****  
1. npm publish

## 本地测试

1. yarn dist
2. nodemodule目录添加vue-ui-mar
3. 将dist生成的js放到vue-ui-mar

## 本地调试

1. src/index.js修改MARUI引用为./packages
1. yarn start

## profile

--profile --json > compilation-stats.json
