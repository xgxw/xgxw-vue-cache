[vue风格指南](https://cn.vuejs.org/v2/style-guide/)
1. 单文件组件的文件名应该要么始终是单词大写开头 (PascalCase), 要么始终是横线连接 (kebab-case).



[vue-ts支持](https://cn.vuejs.org/v2/guide/typescript.html)

[vue-class-component](https://github.com/vuejs/vue-class-component): 以基于类的API的方式声明组件. 参考 Markdown.vue


静态资源处理
public文件夹下的文件并不会被Webpack处理：它们会直接被复制到最终的打包目录（文件名需指定）下。必须使用绝对路径引用这些文件，简单说就是用来存放万年不变的文件。在vue2.x版本类似static/ 文件夹.

src/assets 可以通过相对路径引入(webpack会处理路径关系), 可以被webpack处理. 参考 https://hq5544.github.io/vue-webpack/static.html

组建推荐 https://github.com/vuejs/awesome-vue

deep selector, 在 scope 作用域中影响子组建. scss 只能使用 `::v-deep `

vue3 ts 修饰词用法参考:
https://github.com/vuejs/vue-class-component/blob/master/README.md
https://github.com/kaorun343/vue-property-decorator


对于 vuex, 在页面内通过 vue-router.push 等方法跳转是可以保留数据的, 但是通过直接进入路由的方式, 会重置store状态, 相当与必须在单页模式下才行, 输入url进入不是SPA.


```Typescript
// 如下是错误的一种示范, tokenClient.hasTokenInfo() 返回一个 promise, redirectToLogin 返回的是 hasTokenInfo() 是否执行, 而不论hasTokenInfo内是 resolved, 还是 reject
// 具体参考 https://github.com/everywan/note/blob/master/front_end/js/promise.md
function redirectToLogin(router: VueRouter): Promise<any> {
  return tokenClient.hasTokenInfo().catch(e => {
    router.push("/login")
  })
}
```

事件流 / dom异步渲染更新