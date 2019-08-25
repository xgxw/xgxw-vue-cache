TODO
1. Login页面完善
1. token 续期的问题
1. del/add path

feature
1. 增加类似qq宠物的功能, 在页面展示, 同时后期提供如下功能
    - 介绍网站使用, 如 alt+space 切出菜单栏
    - 偶尔说一些 "名言"(网上抄的, 自己写的, 都行)
    - 添加对话功能, 可以介入小冰等api或者自己学AI技术
3. markdown -> ppt: nodeppt/reveal.js
4. 添加导航到其他网站
    - starkoverflow/ github.explore/infoq
5. 部署: nginx / jupyter.xgxw.com

后续改进
1. catalog 最合理的加载和刷新方式. 目前先为全量读取, 在xcommand中去读.
    - `@/views/reader/Catalog.vue`: 每个catalog页面挂载时(mount), 发送请求, 只请求本页所需数据
    - `@/views/share/XcommandBar.vue`: alt+g 时, 发送请求, 请求全量数据(带loading通知状态)
    - 页面内任何对 catalog 成功的变化, 即修改 vuex 状态, 以保持同步.
    - catalog 数据缓存到localstorage, 采取增量更新的方式.
2. catalog 可以改为markdown? 服务端或本地直接生成markdown文档?

附加
1. 好玩的博客样式如下: 游戏样式
   1. http://maxogden.github.io/slides/nodepdx/index.html
   2. http://www.rleonardi.com/
