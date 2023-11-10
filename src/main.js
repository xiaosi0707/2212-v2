import Vue from 'vue' // 导入vue.js相当于
import App from './App' // 导入App.vue组件
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/** axios配置 - start  */
// 导入axios
import Axios from 'axios'
const AXIOS = Axios.create({
  // 配置前缀公共地址
  // baseURL: 'http://shiyansong.cn:8888/api/private/v1/',
  baseURL: 'http://43.138.15.137:7001/api/private/v1/',
  // 超时配置
  timeout: 1000 * 100
})
// 把Axios实例对象挂载到Vue的原型上面
Vue.prototype.$http = AXIOS
// 添加请求拦截器
AXIOS.interceptors.request.use(function (config) {

  config.headers.Authorization = localStorage.getItem('token')
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
AXIOS.interceptors.response.use(function (response) {

  let { meta } = response.data
  // 提示处理
  if(meta.status === 200) {
    Message.success(meta.msg)
  } else if (meta.status === 201) {
    Message.success(meta.msg)
  }
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});
/* axios配置 - end */

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
