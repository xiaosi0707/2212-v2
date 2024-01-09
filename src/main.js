import Vue from 'vue' // 导入vue.js相当于
import App from './App' // 导入App.vue组件
// 导入打印的包
import Print from 'vue-print-nb'
import ElementUI from 'element-ui';
// 导入Vuex store对象
import store from './store'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TreeTable from 'vue-table-with-tree-grid'
// 整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面
import * as filters from './utils/filters.js'
console.log('filters:', filters)
//遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => { // ['formatDate']
  Vue.filter(key, filters[key]);
})
// 导入axios模块
import './service/http.js'
// 注册为全局组件
Vue.component('tree-table', TreeTable)


// 导入路由对象
import router from './router'
Vue.use(ElementUI).use(Print)
// 关闭开发环境的提示
Vue.config.productionTip = false
// Vue实例
new Vue({
  render: h => h(App), // 把App组件挂载到#app的html页面上
  router, // 全局挂载Vue实例对象
  store
}).$mount('#app')
console.log(`环境变量对象：${JSON.stringify(process.env)}`)
