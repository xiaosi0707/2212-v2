import Vue from 'vue' // 导入vue.js相当于
import App from './App.vue' // 导入App.vue组件
// import Parent from './components/parent.vue'
// 导入路由对象
import router from './router/index.js'

// 关闭开发环境的提示
Vue.config.productionTip = false
// Vue实例
new Vue({
  render: h => h(App), // 把App组件挂载到#app的html页面上
  router // 全局挂载Vue实例对象
}).$mount('#app')
