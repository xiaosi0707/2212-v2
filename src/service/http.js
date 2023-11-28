/** axios配置 - start  */
// 导入axios
import Vue from 'vue'
import Axios from 'axios'
import { Loading, Message } from 'element-ui';
let loadingInstance = null
const AXIOS = Axios.create({
  // 配置前缀公共地址
  // baseURL: 'http://shiyansong.cn:8888/api/private/v1/',
  baseURL: process.env.VUE_APP_SERVE,
  // 超时配置
  timeout: 1000 * 100
})
// 把Axios实例对象挂载到Vue的原型上面
Vue.prototype.$http = AXIOS
// 添加请求拦截器
AXIOS.interceptors.request.use(function(config) {
  // 打开loading
  // loadingInstance = Loading.service({
  //   text: '拼了老命加载中...',
  //   spinner: 'el-icon-video-camera'
  // })
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
  let { data, meta } = response.data
  // 数据返回后关闭loading
  // loadingInstance.close()
  // 先关闭所有的提示
  Message.closeAll()
  // 针对不同的状态码返回不同的提示信息
  switch (meta.status) {
    case 200:
      Message.success(meta.msg)
      break;
    case 201:
      Message.success(meta.msg)
      break;
    case 204:
      Message.success(meta.msg)
      break;
    case 400:
      Message.error(meta.msg)
      break;
    case 401:
      Message.error(meta.msg)
      break;
    case 403:
      Message.error(meta.msg)
      break;
    case 404:
      Message.error(meta.msg)
      break;
    case 422:
      Message.error(meta.msg)
      break;
    case 500:
      Message.error(meta.msg)
      break;
    default:
      Message.success(meta.msg)

  }
  // 对响应数据做点什么
  return response; // res.data.data
}, function(error) {

  console.log('请求报错啦：', error)
  if (JSON.stringify(error).includes('timeout')) {
    // 数据返回后关闭loading
  loadingInstance.close()
    Message.error('服务器响应超时，请检查网络')
    // 数据返回后关闭loading
    loadingInstance.close()

    return
  }
  return Promise.reject(error);

});
export default AXIOS
/* axios配置 - end */
