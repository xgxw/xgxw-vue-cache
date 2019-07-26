feature
1. 悬浮可拖动工具 demo: 回到顶部
2. 添加 help 页, 负责教程指导
3. 增加文档功能: 前后端都需要

其他代办
1. Login页面完善
2. 移动端支持

后期完善
1. token 续期的问题

附加
1. 好玩的博客样式如下: 游戏样式
   1. http://maxogden.github.io/slides/nodepdx/index.html
   2. http://www.rleonardi.com/
2. 也可以考虑 shell 样式, 很好玩



添加 快捷启动shell, 使用 弹层Modal+input+提示 的方式, 不同页面使用不同的提示词.
参考 chrome-vim? 
https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md 自动补全.

两个问题
1. 使用快捷键呼出 shell, 但是在哪里显示? Modal 还是类似 cVim? 定义在每个组件还是顶层? 顶层如何实现?
   1. 或者在旁边添加个小机器人, 通过小机器人的方式?
2. 配置文件方式: 使用指定组合的方式吧. 尽量偏向于开放性, 但是估计受限与目前技术, 做不到.
   1. 目前阶段下应该没有什么办法可以做到更多开放性的事? 了解 语义理解/AI/自动编程 看看吧.

shell: 配置 json 格式
```JSON
{
  "id":"",
  // 输入的命令格式
  "cmd":"show **",
  "describe":"",
  // 设置的位置
  "x":0,
  "y":0
}
```
