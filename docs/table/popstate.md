# 智能返回拦截
组件会自动拦截返回事件，请尽情的使用浏览器返回键，当出现多个`c-table`时也会按预期正常工作。

### 1.模拟页面模式
请尝试点击新增，而后点击浏览器返回试试效果

::: demo
table/popstate
:::

### 2.主动返回
当`c-table`处于例如查看状态时，可通过`vue-router.back()`或`window.history.back()`使其回到表格状态

::: demo
table/popstate3
:::
