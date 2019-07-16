1. 问题: 子元素 margin 影响父元素, 导致父元素出现 margin.
   - 原因: 所有毗邻的两个或更多盒元素的margin将会合并为一个margin共享之。毗邻的定义为：同级或者嵌套的盒元素，并且它们之间没有非空内容、Padding或Border分隔.
   - 解决: 父元素添加 `overflow:hidden;` 代码位置: Article.vue 组件
   - 参考url: [子元素margin-top为何会影响父元素？](https://blog.csdn.net/sinat_27088253/article/details/52954688)