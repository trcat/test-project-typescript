# 环境配置
## Vue-cli

这边初始化项目的时候，在 Vue-cli 项目创建流程中勾选需要用到的工具，如：

- babel
- vuex
- vue-router
- css-loader
- typescript
- ...（这部分内容一看就会明白）

流程结束后，`tsconfig` 等文件的配置以及 `.d.ts `文件也都会帮我们自动完成。



## Element-ui

### 安装命令

`npm install element-ui -S`

### 关于 `.d.ts` 文件

由于 `element-ui` 自带 `index.d.ts` 文件，故不需要自己编写 `.d.ts` 文件.

### 使用

```typescript
//范例
import * as Element from "element-ui";
import "element-ui/lib/theme-chalk/index-css";
```



## JQuery

### 安装命令

`npm install jquery @types/jquery --save`

### 使用

```typescript
import * as $ from "jquery"
```



## jquery.cookie

### 安装命令

`npm install jquery.cookie @types/jquery.cookie --save`

### 使用

```typescript
import * as $ from "jquery"
import "jquery.cookie"
```





# project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
