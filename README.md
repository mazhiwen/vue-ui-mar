# vue ui组件开发


## 编译发布

```sh
#编译生成lib目录
yarn dist
```

## 本地调试

```js
// src/index.js修改MARUI引用为./packages
```
```sh
yarn start
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
}
```

- build/bin/build-entry

通过模版生成src/index.js

