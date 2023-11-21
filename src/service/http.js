/** axios配置 - start  */
// 导入axios
import Vue from 'vue'
import Axios from 'axios'
import { Message, Loading } from 'element-ui';
 // 定义loading变量为空对象null
let loading = null;
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
   loading = Loading.service({
        text: '拼了老命加载中...',
        spinner: 'el-icon-video-camera'
     });
  config.headers.Authorization = localStorage.getItem('token')
  // 在发送请求之前做些什么
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
AXIOS.interceptors.response.use(function(response) {
  let { meta } = response.data
  console.log(window.navigator)
    // 数据成功返回关闭loading
     loading.close()
  Message.closeAll()
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
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 请求超时处理
  // 该返回的数据则是axios.catch(err)中接收的数据
  // 请求超时处理
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
  if (JSON.stringify(error).includes('timeout')) {
    Message.error('服务器响应超时，请检查网络')
    return
  }


  return Promise.reject(error);

});
export default AXIOS
/* axios配置 - end */
