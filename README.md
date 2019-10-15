# vue ui组件开发







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

