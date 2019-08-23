# xgxw_frontend

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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

vue/react: https://zhuanlan.zhihu.com/p/24548677
https://www.zhihu.com/question/301860721/answer/545031906

## 功能
### 文件管理功能
1. 文件管理路径为 `reader/` 和 `editor/`, reader 负责查看, editor 负责编辑文章
    - 对于 reader, 当路径以 `/` 结尾时, 即查看文件夹
    - 对于 reader, 当路径不以 `/` 结尾时, 即查看文件

### 命令栏组件
1. 可通过快捷键呼出命令栏
2. 命令栏功能包括
    - 跳转网页
    - 执行自定义功能, 如打印,切换挂件显示状态等

### 其他
1. markdown 编辑/渲染: markdown-it 组件
2. 目录树组件: antd-vue:tree

### 存档功能
1. 右键菜单
2. 左侧导航栏: 模仿octotree
3. CommandBar modal
4. mmd 虚拟3D动画
    