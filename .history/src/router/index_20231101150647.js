// src/router/index.js就是当前项目的路由模块

//1．导入Vue 和VueRouter的包
import Vue from "vue";
import VueRouter from "vue-router";

//2．调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter);
// 导入组件
import Main from '../components/houtai/main.vue'
import Users from '../components/houtai/users.vue'
import Rights from '../components/houtai/rights.vue'
import UserInfo from '../components/houtai/'
//3．创建路由的实例对象
const router = new VueRouter({
  routes: [
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/users',
                component: Users
            },
            {
                path: '/rights',
                component: Rights
            }
        ]
    }
  ],
});

//4．向外共享路由的实例对象
export default router;
