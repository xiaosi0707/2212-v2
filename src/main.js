import Vue from 'vue' // 导入vue.js相当于
import App from './App' // 导入App.vue组件
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TreeTable from 'vue-table-with-tree-grid'
// 导入axios模块
import './service/http.js'
// 注册为全局组件
Vue.component('tree-table', TreeTable)

// 导入路由对象
import router from './router'
Vue.use(ElementUI)
// 关闭开发环境的提示
Vue.config.productionTip = false
// Vue实例
new Vue({
  render: h => h(App), // 把App组件挂载到#app的html页面上
  router // 全局挂载Vue实例对象
}).$mount('#app')
