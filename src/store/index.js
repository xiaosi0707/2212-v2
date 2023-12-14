import Vue from 'vue'
// 导入Vuex这个包
import Vuex from 'vuex'
// 导入count子模块
import Count from './modules/count.js'
import Todo from './modules/todo.js'
// 作为Vue的插件使用
Vue.use(Vuex)


// 创建store对象store就是仓库、商店的意思
const store = new Vuex.Store({
  modules: {
    Count,
    Todo
  }
  
})
export default store
