import Vue from 'vue' // 导入vue.js相当于
import App from './App.vue' // 导入App.vue组件

// 关闭开发环境的提示
Vue.config.productionTip = false
// Vue实例
new Vue({
  render: h => h(App) // 把App组件挂载到#app的html页面上
}).$mount('#app')
