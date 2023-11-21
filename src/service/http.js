/** axios配置 - start  */
// 导入axios
import Vue from 'vue'
import Axios from 'axios'
import { Loading } from 'element-ui';
let loadingInstance = null
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
AXIOS.interceptors.request.use(function(config) {
  // 打开loading
  loadingInstance = Loading.service({
    text: '拼了老命加载中...',
    spinner: 'el-icon-video-camera'
  })
  config.headers.Authorization = localStorage.getItem('token')
  // 在发送请求之前做些什么
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
AXIOS.interceptors.response.use(function(response) {
  console.log('响应拦截器的返回值：', response)
  let { data } = response.data
  // 数据返回后关闭loading
  loadingInstance.close()
  // 对响应数据做点什么
  return response; // res.data.data
}, function(error) {

  return Promise.reject(error);

});
export default AXIOS
/* axios配置 - end */