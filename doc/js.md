### 事件监听
```JavaScript
// 添加 keydown 的监听者
document.addEventListener("keydown", onkeydown.bind(this));
// 移除监听
document.removeEventListener("keydown")
// 替换默认的 keydown 监听事件
document.onkeydown = (e: KeyboardEvent) => {}
// 阻止事件冒泡, 但不阻止默认事件的触发
e.stopPropagation();
// 阻止默认事件
e.preventDefault();
```

监听事件的触发顺序: `事件dom -> all.父dom -> document.Listener -> defaultAction`, 与冒泡顺序相同.
 
冒泡: 当鼠标点击/触发dom事件时, 浏览器会从根节点开始由外到内进行事件传播, 即点击了子元素, 如果父元素通过事件捕获方式注册了对应的事件的话, 会先触发父元素绑定的事件.

`e.stopPropagation()` 只会阻止事件冒泡, 即该dom的父dom上的事件触发, 而该dom的多个 Listener 不会被阻止.
